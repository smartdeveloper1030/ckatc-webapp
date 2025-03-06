import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ClipboardCheck,
  Clock,
  Timer,
  Brain,
  Target,
  TrendingUp,
  User,
  Settings,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { getStudents } from "../api/userApis";
import { getSessionsWithTherapist } from "../api/getSessionsWithTherapist";
import { AllProgramsAndTargets, ProgramInfo, SessionInfo } from "../types/utils";
import { getSessionsDetails } from "../api/getSessionsDetails";
import { useTarget } from "../context/TargetContext";
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

export const DashboardWgt = () => {
  const { user, students, setCurStudent, curStudent, setStudents } = useUser();
  const { setPrograms, setSession } = useTarget();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [schedule, setSchedule] = useState<SessionInfo[]>([]);
  const [expandedSession, setExpandedSession] = useState<{sessionInfo: SessionInfo, sessionIndex: number} | null>(null);
  const [allProgramsAndTargets, setAllProgramsAndTargets] = useState<AllProgramsAndTargets | null>(null);

  const navigate = useNavigate();

  const getStudentDetails = async (id: string) => {
    getStudents(id).then((response) => {
      setStudents(response);
    });
  };

  useEffect(() => {
    if (user?.id) {
      getStudentDetails(user?.id);
    }
  }, [user?.id]);

  useEffect(() => {
    console.log("DashboardWgt Students:", students);
    if (students && students.length > 0) {
      const sessions = students.map((student) => ({
        client: student.first_name + " " + student.last_name,
        time: "11:30 AM",
        duration: "90 min",
        type: "Discrete Trial Training ",
        targets: student.target_counts,
        behaviors: 0,
        image:
          "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=150&h=150&fit=crop&q=85",
      }));
      setSessions(sessions);
    }
  }, [students]);

  const stats = [
    {
      title: "Active Clients",
      value: "24",
      change: "+2",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Mastered Targets",
      value: "156",
      change: "+12",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "VB-MAPP Due",
      value: "5",
      change: "-2",
      icon: ClipboardCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Behavior Reduction",
      value: "32%",
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const handleStudentClick = (index: number) => {
    if (students && students.length > 0) {
      setCurStudent(students[index]);
      const student_id = students[index].id;
      const therapist_id = user?.id;

      if (therapist_id && student_id) {
        getSessionsWithTherapist(therapist_id, student_id.toString()).then((response) => {
          const items : SessionInfo[] = [];
          response.sessions.map((s: SessionInfo) => {
            items.push(s);
          });
          console.log({items});
          setSchedule(items);
        });
      }
      // navigate(`/session?student_id=${id}`);
    }
  };

  const handleImageError = (index: number) => {
    setSessions((prevSessions) =>
      prevSessions.map((session, i) =>
        i === index ? { ...session, imageError: true } : session
      )
    );
  };

  const toggleSession = (item: SessionInfo, index: number) => {
    console.log({item, index});
    setSession(item);
    getSessionsDetails(item.id, item.student_id).then((response) => {
      setAllProgramsAndTargets(response);
    });
    setExpandedSession(prev => {
      if (prev?.sessionInfo === item && prev?.sessionIndex === index) {
        return null;
      }
      return { sessionInfo: item, sessionIndex: index };
    });
  };

  const handleProgramAndTargetClick = (program: ProgramInfo[]) => {
    setPrograms(program); 
    navigate('/session');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <h2 className="text-xl font-semibold text-gray-900">ABA Dashboard</h2>
      </div>

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <div className="flex items-baseline mt-1">
                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                      <p
                        className={`ml-2 text-sm ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Students list
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {sessions.map((session, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleStudentClick(index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shadow-sm ring-1 ring-gray-200">
                          {session.imageError ? (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <User className="h-8 w-8 text-gray-400" />
                            </div>
                          ) : (
                            <img
                              src={session.image}
                              alt={session.client}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(index)}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {session.client}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {session.type}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-xs text-blue-600">
                              <Target className="h-3 w-3" />
                              <span>{session.targets} targets</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button 
                            className="p-4 rounded-full hover:bg-gray-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (students && students.length > 0) {
                                setCurStudent(students[index]);
                                navigate(`/sessionConfig`);
                              }
                            }}
                          >
                            <Settings className="h-10 w-10 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Session Schedule
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
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
                            {expandedSession?.sessionInfo === item && expandedSession?.sessionIndex === index && (
                              <div className="mt-2 ml-4 space-y-2">

                                {allProgramsAndTargets?.baselinePrograms?.length && allProgramsAndTargets?.baselinePrograms?.length > 0 && (
                                <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                onClick={() => handleProgramAndTargetClick(allProgramsAndTargets?.baselinePrograms)}
                                >
                                  <span className="text-sm text-gray-700">BaseLine</span>
                                  <button 
                                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate('/programConfig');
                                    }}
                                  >
                                    <Settings className="h-5 w-5 text-gray-500" />
                                  </button>
                                </div>
                                )}

                                {allProgramsAndTargets?.inTreatmentPrograms?.length && allProgramsAndTargets?.inTreatmentPrograms?.length > 0 && (
                                <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                onClick={() => handleProgramAndTargetClick(allProgramsAndTargets?.inTreatmentPrograms)}
                                >
                                  <span className="text-sm text-gray-700">Target</span>
                                  <button 
                                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate('/programConfig');
                                    }}
                                  >
                                    <Settings className="h-5 w-5 text-gray-500" />
                                  </button>
                                </div>
                                )}

                                {allProgramsAndTargets?.masteredPrograms?.length && allProgramsAndTargets?.masteredPrograms?.length > 0 && (  
                                <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                onClick={() => handleProgramAndTargetClick(allProgramsAndTargets?.masteredPrograms)}
                                >
                                  <span className="text-sm text-gray-700">Maintenance</span>
                                  <button 
                                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate('/programConfig');
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
