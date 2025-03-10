import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TargetProvider } from './context/TargetContext';
import { DashboardWgt } from './pages/DashboardWgt';
import { LoginPage } from './pages/LoginPage';
import { SessionPage } from './pages/SessionPage';
import { UserProvider } from './context/UserContext';
import { SessionSetting } from './pages/SessionSetting';
import { ProgramSetting } from './pages/ProgramSetting';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
      <TargetProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardWgt/>} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/sessionSetting" element={<SessionSetting />} />
          <Route path="/programSetting" element={<ProgramSetting />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TargetProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;