import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { UserInfo, Student } from "../types/utils";
import { getStudents, getUserDetail } from "./../api/userApis";
import supabase from "../library/supabaseClient";
import { useNavigate } from "react-router-dom";

interface UserContextType {
  user: UserInfo | undefined;
  setUser: (user: UserInfo) => void;
  students: Student[] | undefined;
  setStudents: (students: Student[]) => void;
  curStudent: Student | undefined;
  setCurStudent: (student: Student) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [students, setStudents] = useState<Student[]>([]);
  const [curStudent, setCurStudent] = useState<Student | undefined>(undefined);

  // Sign-out function
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut({
        scope: "local",
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      handleSignedOut();
    }
  }, [user]);

  // Handle signed-out state
  const handleSignedOut = useCallback(() => {
    localStorage.removeItem("selected_user");
    setUser(undefined);
    setStudents([]); // Clear students when signing out
    setCurStudent(undefined); // Clear current student when signing out
    navigate("/");
  }, [navigate]);

  // Fetch students data for a user
  const getStudentsData = useCallback(async (id: string) => {
    try {
      const response = await getStudents(id);
      setStudents(response);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, []);

  // Fetch user data from localStorage and API
  const getUserData = useCallback(async () => {
    const selectedUser = localStorage.getItem("selected_user");
    const userInfo = selectedUser ? JSON.parse(selectedUser) : null;

    if (userInfo?.id) {
      try {
        const response = await getUserDetail(userInfo.id);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  // Fetch students data when user changes
  useEffect(() => {
    if (user?.id) {
      getStudentsData(user.id);
    }
  }, [user?.id, getStudentsData]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        students,
        setStudents,
        curStudent,
        setCurStudent,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
