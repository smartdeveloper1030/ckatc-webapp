import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Target,
  User,
  Settings,
} from "lucide-react";
import { useUser } from "./../../context/UserContext";
import { getStudents } from "./../../api/userApis";
import { getSessionsWithTherapist } from "./../../api/userApis";
import { AllProgramsAndTargets, ProgramInfo, SessionInfo } from "./../../types/utils";
import { getSessionsDetails } from "./../../api/userApis";
import { useTarget } from "./../../context/TargetContext";

interface SessionItem {
  client: string;
  time: string;
  duration: string;
  type: string;
  targets: number;
  behaviors: number;
  image: string;
  imageError?: boolean;
}

export const SessionSchedule = () => {
  const { user, students, setStudents, curStudent, setCurStudent } = useUser();
  const { setPrograms, setSession } = useTarget();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [schedule, setSchedule] = useState<SessionInfo[]>([]);
  const [expandedSession, setExpandedSession] = useState<{sessionInfo: SessionInfo, sessionIndex: number} | null>(null);
  const [allProgramsAndTargets, setAllProgramsAndTargets] = useState<AllProgramsAndTargets | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const sessions = localStorage.getItem("sessions");
    const schedule = localStorage.getItem("schedule");
    const student = localStorage.getItem("curStudent");
    const expandedSessionData = localStorage.getItem("expandedSession");

    if (sessions && sessions.length > 0) setSessions(JSON.parse(sessions));
    if (schedule && schedule.length > 0) setSchedule(JSON.parse(schedule));
    if (student) setCurStudent(JSON.parse(student));
    if (expandedSessionData) {
      const parsedData = JSON.parse(expandedSessionData);
      setExpandedSession(parsedData);
      // Also fetch session details when restoring expanded state
      if (parsedData?.sessionInfo) {
        getSessionsDetails(parsedData.sessionInfo.id, parsedData.sessionInfo.student_id).then((response) => {
          setAllProgramsAndTargets(response);
        });
      }
    }
  }, []);


  const toggleSession = (item: SessionInfo, index: number) => {
    setSession(item);
    getSessionsDetails(item.id, item.student_id).then((response) => {
      localStorage.setItem("session_id", JSON.stringify(item.id));
      setAllProgramsAndTargets(response);
      if (response && Object.keys(response).length > 0) {
        localStorage.setItem("allProgramsAndTargets", JSON.stringify(response));
      }
      console.log("----------Third Step: getSessionsDetails(session_id, item.student_id)----------");
      console.log({response});
    });

    setExpandedSession(prev => {
      if (prev?.sessionInfo.id === item.id && prev?.sessionIndex === index) {
        localStorage.removeItem("expandedSession");
        return null;
      }
      const expandedSessionData = { sessionInfo: item, sessionIndex: index };
      localStorage.setItem("expandedSession", JSON.stringify(expandedSessionData));
      return expandedSessionData;
    });
  };

  const handleProgramAndTargetClick = (program: ProgramInfo[], treatment_step: string) => {
    console.log("------------Fourth Step: handleProgramAndTargetClick(programs)------------");
    console.log({program});
    localStorage.setItem("treatment_step", treatment_step);
    setPrograms(program); 
    navigate('/session');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
            Session Schedule
            </h3>
        </div>
        <div className="p-6">
            <div>
            {schedule.map((item, index) => (
                <div key={index}>
                    <div className="space-y-3">
                        <div key={index}>
                        <div
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => toggleSession(item, index)}
                        >
                            <div className="w-10 h-10 bg-[#2B4C7E] rounded-lg flex items-center justify-center text-white font-medium">
                            {curStudent?.first_name?.split(" ")[0][0]}
                            {curStudent?.last_name?.split(" ")[0][0]}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                {curStudent?.first_name} {curStudent?.last_name}.
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">
                                {item.created_at}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-sm text-gray-500">
                                    {/* {item.settings.advance_format} */}
                                </span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                <Brain className="h-3 w-3 text-[#2B4C7E]" />
                                <span className="text-xs text-gray-500">
                                {item.settings.advance_format}
                                </span>
                                </div>
                            </div>
                            <div className={`transform transition-transform ${expandedSession?.sessionInfo === item && expandedSession?.sessionIndex === index ? 'rotate-180' : ''}`}>
                                ▼
                            </div>
                            
                        </div>
                        <div className="flex flex-col">
                                {expandedSession?.sessionInfo.id === item.id && expandedSession?.sessionIndex === index && (
                                <div className="flex flex-row mt-2 ml-2 gap-2">
                                    {allProgramsAndTargets?.baselinePrograms && allProgramsAndTargets.baselinePrograms.length > 0 && (
                                    <div className="flex-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                    onClick={() => handleProgramAndTargetClick(allProgramsAndTargets.baselinePrograms, "Baseline")}
                                    >
                                    <span className="text-sm text-gray-700">BaseLine</span>
                                    <button 
                                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                        onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/programSetting');
                                        }}
                                    >
                                        <Settings className="h-5 w-5 text-gray-500" />
                                    </button>
                                    </div>
                                    )}

                                    {allProgramsAndTargets?.inTreatmentPrograms && allProgramsAndTargets.inTreatmentPrograms.length > 0 && (
                                    <div className="flex-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                    onClick={() => handleProgramAndTargetClick(allProgramsAndTargets.inTreatmentPrograms, "In_Treatment")}
                                    >
                                    <span className="text-sm text-gray-700">Target</span>
                                    <button 
                                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                        onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/programSetting');
                                        }}
                                    >
                                        <Settings className="h-5 w-5 text-gray-500" />
                                    </button>
                                    </div>
                                    )}

                                    {allProgramsAndTargets?.masteredPrograms && allProgramsAndTargets.masteredPrograms.length > 0 && (  
                                    <div className="flex-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                    onClick={() => handleProgramAndTargetClick(allProgramsAndTargets.masteredPrograms, "Maintenance")} 
                                    >
                                    <span className="text-sm text-gray-700">Maintenance</span>
                                    <button 
                                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                        onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("----------Fourth Step: navigate('/programSetting')----------");
                                        navigate('/programSetting');
                                        }}
                                    >
                                        <Settings className="h-5 w-5 text-gray-500" />
                                    </button>
                                    </div>
                                    )}
                                </div>
                                )}
                            </div>
                        </div>
                    </div>  
                </div>
                ))}
            </div>
        </div>
        </div>
  );
};
