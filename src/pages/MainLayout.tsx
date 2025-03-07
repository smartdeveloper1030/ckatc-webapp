import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Navigator } from "../components/Navigator";
import { Content } from "./Content";
import { useUser } from "../context/UserContext";
import { ProgramInfo } from "../types/utils";
import { useTarget } from "../context/TargetContext";
import { MenuList } from "../components/MenuList";
import { Footer } from "../components/Footer";

export interface ProgramsInfo {
  programs: ProgramInfo[];
}

export const MainLayout = () => {
  const { curStudent } = useUser();

  const { selectedTarget } = useTarget();

  const [selectedStudent] = useState("Example Student");
  const [targetType, setTargetType] = useState<string>("");

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  useEffect(()=>{
    if (selectedTarget?.target?.target_type) {
      setTargetType(selectedTarget.target.target_type);
    }
  },[curStudent?.id, selectedTarget])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onBackClick={handleBackClick} studentName={curStudent?.first_name + " " + curStudent?.last_name} />
      <Navigator studentName={selectedStudent} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 bg-white border-r flex flex-col overflow-hidden">
          {/* <Search /> */}
          <MenuList />
        </aside>
        <main className="flex-1 flex flex-col overflow-hidden">
          {targetType === "DTT" && <Content />}
          <Footer />
        </main>
      </div>
    </div>
  );
};
