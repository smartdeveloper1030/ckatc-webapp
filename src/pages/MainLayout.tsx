import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Navigator } from "../components/Navigator";
import { Sider } from "../components/Sider";
import { Content } from "./Content";
import { useUser } from "../context/UserContext";
import { getProgramsAndTargetsApi, getStudentWithID } from "../api/userApis";
import { ProgramInfo } from "../types/utils";
import { useTarget } from "../context/TargetContext";

export interface ProgramsInfo {
  programs: ProgramInfo[];
}

export const MainLayout = () => {
  const [param] = useSearchParams();
  const student_id = param.get("student_id");
  const { curStudent, setCurStudent } = useUser();
  const { setPrograms } = useTarget();

  const [selectedStudent, setSelectedStudent] = useState("Example Student");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const getStudentDetail = async () => {
    if (student_id) {
      getStudentWithID(parseInt(student_id)).then((res) => {
        setCurStudent(res.student);
      });
    }
  };

  useEffect(() => {
    getStudentDetail();
  }, [student_id]);

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
