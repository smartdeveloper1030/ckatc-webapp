import React, {useEffect, useState} from "react";
import {
    Target,
    User,
    Settings,
  } from "lucide-react";
import { useUser,  } from "./../../context/UserContext";
import { useDash } from "../../context/DashContext";
import { getStudents, getSessionsWithTherapist } from "../../api/userApis";
import { SessionInfo } from "../../types/utils";

interface StudentItem {
    client: string;
    time: string;
    duration: string;
    type: string;
    targets: number;
    behaviors: number;
    image: string;
    imageError?: boolean;
}

export const StudentList = () => {
    const { user, students, setStudents, setCurStudent}  = useUser();
    const { setSchedule, setShowConfig, setSessionInfo } = useDash();
    const [studentList, setStudentList] = useState<StudentItem[]>([]);
    
    const getStudentDetails = async (id: string) => {
        getStudents(id).then((response) => {
            setStudents(response); 
            console.log('------------------First Step : getStudents------------------')
            console.log({students: response})
        });
    };

    useEffect(() => {
        if (user?.id) {
            getStudentDetails(user.id);
        }
    }, [user?.id]);

    useEffect(() => {
        if (students && students.length > 0) {
            const sessions = students.map((student) => ({
                client: student.first_name + " " + student.last_name,
                time: "11:30 AM",
                duration: "90 min",
                type: "Discrete Trial Training ",
                targets: student.target_counts ? student.target_counts : 0,
                behaviors: 0,
                image: "",
            }));

            setStudentList(sessions);
            if (sessions && sessions.length > 0) {
                localStorage.setItem("sessions", JSON.stringify(sessions));
            }
        }
    }, [students]);

    const handleStudentClick = (index: number) => {
        if (students && students.length > 0) {
            setCurStudent(students[index]);
            const student_id = students[index].id;
            const therapist_id = user?.id;
        
            if (therapist_id && student_id) {
                getSessionsWithTherapist(therapist_id, student_id.toString()).then((response) => {
                    console.log("----------Second Step: getSessionsWithTherapist(therapist_id, student_id)----------");
                    console.log(response.sessions);
                    const session_info : SessionInfo = response.sessions;
                    const items: SessionInfo[] = [];
                    items.push(session_info);
                    setSchedule(items);
                    setSessionInfo(session_info);
                });
            }
        }
        setShowConfig(false);
    };

    const handleStudentSettingClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.stopPropagation();
        handleStudentClick(index);
        setShowConfig(true);
    }
    
    const handleImageError = (index: number) => {
        setStudentList((prevSessions) =>
            prevSessions.map((session, i) =>
                i === index ? { ...session, imageError: true } : session
            )
        );
    };
    
    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                Students list
                </h3>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                {studentList.map((student_item, index) => (
                    <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleStudentClick(index)}
                    >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shadow-sm ring-1 ring-gray-200">
                        {student_item.imageError ? (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-400" />
                            </div>
                        ) : (
                            <img
                            src={student_item.image}
                            alt={student_item.client}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(index)}
                            />
                        )}
                        </div>
                        <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                            {student_item.client}
                        </h4>
                        <p className="text-sm text-gray-500">
                            {student_item.type}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-xs text-blue-600">
                            <Target className="h-3 w-3" />
                            <span>{student_item.targets} targets</span>
                            </div>
                        </div>
                        </div>
                        <div className="flex items-center">
                        <button 
                            className="p-4 rounded-full hover:bg-gray-200 transition-colors"
                            onClick={(e) => handleStudentSettingClick(e, index)}
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
    );
}