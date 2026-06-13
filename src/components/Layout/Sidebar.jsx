import { NavLink, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/obras', icon: '🏗️', label: 'Obras' },
  { to: '/documentos', icon: '📚', label: 'Biblioteca de Documentos' },
  { to: '/notificaciones', icon: '🔔', label: 'Notificaciones', badge: 7 },
  { to: '/configuracion', icon: '⚙️', label: 'Configuración' },
];

export function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">TV</div>
        <span className="sidebar-logo-text">TrazaViva</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-nav-item${isActive ? ' active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ marginBottom: 8 }}>v1.0.0 — Prototipo</div>
      </div>
    </aside>
  );
}
