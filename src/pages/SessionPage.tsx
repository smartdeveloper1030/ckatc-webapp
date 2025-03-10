import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Navigator } from "../components/Navigator";
import { DTT } from "../components/Session/DTT";
import { useUser } from "../context/UserContext";
import { ProgramInfo } from "../types/utils";
import { useTarget } from "../context/TargetContext";
import { ProgramsList } from "../components/Session/ProgramsList";
import { Footer } from "../components/Session/Footer";
import { getSessionsDetails } from "../api/userApis";

export interface ProgramsInfo {
  programs: ProgramInfo[];
}

export const SessionPage = () => {
  const { curStudent } = useUser();
  const { selectedTarget, setPrograms } = useTarget();
  const [headerName, setHeaderName] = useState<string>("example student");

  const [selectedStudent] = useState("Example Student");
  const [targetType, setTargetType] = useState<string>("");

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  useEffect(()=>{
    const student = localStorage.getItem("curStudent");
    const session_id = localStorage.getItem("session_id");
    const treatment_step = localStorage.getItem("treatment_step");

    if (session_id && student && treatment_step) {
      const parsedStudent = JSON.parse(student);
      setHeaderName(parsedStudent?.first_name + " " + parsedStudent?.last_name.charAt(0).toUpperCase() + ".");
      getSessionsDetails(parseInt(session_id), parseInt(parsedStudent?.id))
      .then((response) => {
        console.log({response});
        if (treatment_step === "Baseline") {
          setPrograms(response.baselinePrograms);
        } else if (treatment_step === "In_Treatment") {
          setPrograms(response.inTreatmentPrograms);
        } else if (treatment_step === "Maintenance") {
          setPrograms(response.masteredPrograms);
        }
      });
    }
  },[])

  useEffect(()=>{
    if (curStudent) {
      setHeaderName(curStudent.first_name + " " + curStudent.last_name.charAt(0).toUpperCase() + ".");
    }

    if (selectedTarget?.target?.target_type) {
      setTargetType(selectedTarget.target.target_type);
    }
  },[curStudent, selectedTarget])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onBackClick={handleBackClick} studentName={headerName} />
      <Navigator studentName={selectedStudent} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 bg-white border-r flex flex-col overflow-hidden">
          {/* <Search /> */}
          <ProgramsList />
        </aside>
        <main className="flex-1 flex flex-col overflow-hidden">
          {targetType === "DTT" && <DTT />}
          <Footer />
        </main>
      </div>
    </div>
  );
};
