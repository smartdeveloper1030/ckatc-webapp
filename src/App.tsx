import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TargetProvider } from './context/TargetContext';
import { DashboardWgt } from './components/DashboardWgt';
import { LoginPage } from './components/LoginPage';
import { MainLayout } from './layouts/MainLayout';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
      <TargetProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardWgt/>} />
          <Route path="/session" element={<MainLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TargetProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;