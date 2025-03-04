import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Navigator } from "../components/Navigator";
import { Sider } from "../components/Sider";
import { Content } from "../components/Content";
import { useUser } from "../context/UserContext";
import { getProgramsAndTargetsApi } from "../api/userApis";
import { ProgramInfo } from "../types/utils";
import { useTarget } from "../context/TargetContext";

export interface ProgramsInfo {
  programs: ProgramInfo[];
}

export const MainLayout = () => {
  const { curStudent } = useUser();
  const { setPrograms } = useTarget();

  const [selectedStudent, setSelectedStudent] = useState("Example Student");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (curStudent) {
      setSelectedStudent(curStudent.first_name + " " + curStudent.last_name);
      getProgramsAndTargetsApi(curStudent.id).then((res) => {
        const skills = res.data;
        const programs: ProgramInfo[] = [];
        skills.map((skill: ProgramsInfo) => {
          skill.programs.map((program: ProgramInfo) => {
            programs.push(program);
          });
        });
        setPrograms(programs);
      });
    }
  }, [curStudent]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onBackClick={handleBackClick} studentName={selectedStudent} />
      <Navigator studentName={selectedStudent} />
      <div className="flex flex-1 overflow-hidden">
        <Sider />
        <Content />
      </div>
    </div>
  );
};
