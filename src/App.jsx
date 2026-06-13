import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Topbar } from './components/Layout/Topbar';
import { ToastProvider } from './components/UI/Toast';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Obras } from './pages/Obras';
import { ObraDetalle } from './pages/ObraDetalle';
import { TrabajadorPerfil } from './pages/TrabajadorPerfil';
import { Documentos } from './pages/Documentos';
import { Notificaciones } from './pages/Notificaciones';
import { Configuracion } from './pages/Configuracion';

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/obras" element={<Obras />} />
            <Route path="/obras/:id" element={<ObraDetalle />} />
            <Route path="/obras/:id/trabajadores/:trabajadorId" element={<TrabajadorPerfil />} />
            <Route path="/documentos" element={<Documentos />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
