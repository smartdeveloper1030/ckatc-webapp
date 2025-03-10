import React, {
    createContext,
    useContext,
    useState,
  } from "react";
import { SessionInfo } from "../types/utils";
  
interface DashContextType {
    schedule: SessionInfo[];
    setSchedule: React.Dispatch<React.SetStateAction<SessionInfo[]>>;
    isShowConfig: boolean;
    setShowConfig: React.Dispatch<React.SetStateAction<boolean>>;
    sessionInfo?: SessionInfo;
    setSessionInfo: React.Dispatch<React.SetStateAction<SessionInfo | undefined>>;
}
  
const DashContext = createContext<DashContextType | undefined>(undefined);
  
export function DashProvider({ children }: { children: React.ReactNode }) {
    const [schedule, setSchedule] = useState<SessionInfo[]>([]);
    const [isShowConfig, setShowConfig] = useState<boolean>(false);
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | undefined>(undefined);
  
    return (
      <DashContext.Provider
        value={{
            schedule,
            setSchedule,
            isShowConfig,
            setShowConfig,
            sessionInfo,
            setSessionInfo
        }}
      >
        {children}
      </DashContext.Provider>
    );
}
  
export function useDash() {
    const context = useContext(DashContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
  