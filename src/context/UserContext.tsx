import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserInfo, Student } from '../types/utils';

interface UserContextType {
    user: UserInfo | undefined;
    setUser: (user: UserInfo) => void;
    students: Student[] | undefined;
    setStudents: (students: Student[]) => void;
    curStudent: Student | undefined;
    setCurStudent: (student: Student) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);   

export function UserProvider({ children }: { children: React.ReactNode }) { 
    const [user, setUser] = useState<UserInfo | undefined>(undefined);
    const [students, setStudents] = useState<Student[]>([]);
    const [curStudent, setCurStudent] = useState<Student | undefined>(undefined);

    useEffect(() => {
        
    }, [])

    return (
        <UserContext.Provider value={{ 
            user,
            setUser,  
            students,
            setStudents,
            curStudent,
            setCurStudent
        }}>
          {children}
        </UserContext.Provider>
      );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useTarget must be used within a TargetProvider');
    }
    return context;
  }