import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Settings,
} from "lucide-react";
import { useUser } from "./../../context/UserContext";
import { AllProgramsAndTargets, ProgramInfo, SessionInfo } from "./../../types/utils";
import { getSessionsDetails } from "./../../api/userApis";
import { useTarget } from "./../../context/TargetContext";
import { useDash } from "../../context/DashContext";

export const SessionSchedule = () => {
  const { curStudent } = useUser();
  const { sessionInfo, schedule } = useDash();
  const { setPrograms, setSession } = useTarget();
  const [allProgramsAndTargets, setAllProgramsAndTargets] = useState<AllProgramsAndTargets | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionInfo) {
        console.log({sessionInfo});
        getSessionsDetails(sessionInfo.id, sessionInfo.student_id).then((response) => {
            console.log('getSessionDetails(session_id, student_id)');
            console.log({response})
            setAllProgramsAndTargets(response); 
        });
    }
  }, [sessionInfo])

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
                        </div>
                        <div className="flex flex-col">
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
