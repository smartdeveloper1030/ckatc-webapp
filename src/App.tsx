import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TargetProvider } from './context/TargetContext';
import { DashboardWgt } from './pages/DashboardWgt';
import { LoginPage } from './pages/LoginPage';
import { MainLayout } from './pages/MainLayout';
import { UserProvider } from './context/UserContext';
import { SessionConfig } from './components/SessionConfig/SessionConfig';
import ProgramsConfig from './components/ProgramsConfig/ProgramsConfig';
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
      <TargetProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardWgt/>} />
          <Route path="/session" element={<MainLayout />} />
          <Route path="/sessionConfig" element={<SessionConfig isOpen={true} onClose={() => window.history.back()} />} />
          <Route path="/programConfig" element={<ProgramsConfig isOpen={true} onClose={() => window.history.back()} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TargetProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;