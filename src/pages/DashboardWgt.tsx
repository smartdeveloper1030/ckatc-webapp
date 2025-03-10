import { Header } from "../components/Header";
import { StudentList } from "../components/dashboard/StudentList";
import { SessionSchedule } from "../components/dashboard/SessionSchedule";
import { useDash } from "../context/DashContext";
import { SessionConfig } from "../components/dashboard/SessionConfig";

export const DashboardWgt = () => {
  
  const { isShowConfig } = useDash();

  return (
    <div className="h-screen flex flex-col">
      <Header studentName="Dashboard" />  
      <div className="flex flex-row flex-1 overflow-hidden">
        <aside className="w-[40%] bg-gray-100 p-1 overflow-y-auto">
          <StudentList/>
        </aside>
        <main className="flex-1 p-1 overflow-y-auto">
          {!isShowConfig ? <SessionSchedule /> : <SessionConfig />}
        </main>
      </div>
    </div>
  );
};
