import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  ClipboardCheck,
  Clock,
  Timer,
  Brain,
  Target,
  TrendingUp,
  AlertCircle,
  User
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

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
  const { students, setCurStudent } = useUser();   
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log('DashboardWgt Students:', students);
    if (students && students.length > 0) {
      const sessions = students.map((student) => ({
        client: student.first_name + ' ' + student.last_name,
        time: '11:30 AM',
        duration: '90 min',
        type: 'Natural Environment Teaching',
        targets: student.target_counts,
        behaviors: 0,
        image: "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=150&h=150&fit=crop&q=80",
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
      bgColor: "bg-blue-100"
    },
    {
      title: "Mastered Targets",
      value: "156",
      change: "+12",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "VB-MAPP Due",
      value: "5",
      change: "-2",
      icon: ClipboardCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Behavior Reduction",
      value: "32%",
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const upcomingSessions = [
    {
      date: "Tomorrow",
      sessions: [
        {
          client: "Emma W.",
          time: "9:00 AM",
          duration: "120 min",
          type: "DTT Session",
          bcba: "Dr. Anderson",
          program: "Early Learner"
        }
      ]
    },
    {
      date: "Wed, Feb 24",
      sessions: [
        {
          client: "Oliver K.",
          time: "11:00 AM",
          duration: "120 min",
          type: "Verbal Behavior",
          bcba: "Dr. Thompson",
          program: "Advanced"
        },
        {
          client: "Sophia L.",
          time: "2:30 PM",
          duration: "90 min",
          type: "DTT Session",
          bcba: "Dr. Wilson",
          program: "Early Learner"
        }
      ]
    }
  ];

  const handleSessionClick = (index: number) => {
    if (students && students.length > 0) {
      setCurStudent(students[index]);
      navigate('/app');
    }
  };

  const handleImageError = (index: number) => {
    setSessions(prevSessions => 
      prevSessions.map((session, i) => 
        i === index ? { ...session, imageError: true } : session
      )
    );
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
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className={`ml-2 text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
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
                <h3 className="text-lg font-semibold text-gray-900">Today's Sessions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {sessions.map((session, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSessionClick(index)}
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
                        <div>
                          <h4 className="font-medium text-gray-900">{session.client}</h4>
                          <p className="text-sm text-gray-500">{session.type}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-xs text-blue-600">
                              <Target className="h-3 w-3" />
                              <span>{session.targets} targets</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-orange-600">
                              <AlertCircle className="h-3 w-3" />
                              <span>{session.behaviors} behaviors</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="text-sm font-medium text-gray-900">{session.time}</div>
                          <div className="text-sm text-gray-500">{session.duration}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {upcomingSessions.map((day, dayIndex) => (
                    <div key={dayIndex}>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">{day.date}</h4>
                      <div className="space-y-3">
                        {day.sessions.map((session, sessionIndex) => (
                          <div 
                            key={sessionIndex} 
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <div className="w-10 h-10 bg-[#2B4C7E] rounded-lg flex items-center justify-center text-white font-medium">
                              {session.client.split(' ')[0][0]}{session.client.split(' ')[1][0]}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{session.client}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">{session.type}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-sm text-gray-500">{session.program}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Brain className="h-3 w-3 text-[#2B4C7E]" />
                                <span className="text-xs text-gray-500">{session.bcba}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{session.time}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Timer className="h-4 w-4" />
                                <span>{session.duration}</span>
                              </div>
                            </div>
                          </div>
                        ))}
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
}