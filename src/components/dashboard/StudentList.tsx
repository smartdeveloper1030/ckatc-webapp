import React, {useState} from "react";
import {
    Brain,
    Target,
    User,
    Settings,
  } from "lucide-react";
import { useUser } from "./../../context/UserContext";
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

export const StudentList = () => {
    const { user } = useUser();
    const [sessions, setSessions] = useState<SessionItem[]>([]);
    const [loading, setLoading] = useState(true);
    
    // const getStudentDetails = async (id: string) => {
    //     getStudents(id).then((response) => {
    //         setStudents(response); 
    //         console.log("----------First Step: getStudentDetails(user.id)----------");
    //         console.log({students: response});
    //     });
    // };
    return (
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
                        // onClick={() => handleStudentClick(index)}
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
                                // onError={() => handleImageError(index)}
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
                            //   onClick={(e) => handleStudentSettingClick(e, index)}
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