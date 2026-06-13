import { useNavigate } from 'react-router-dom';

const ICONS = {
  critica: '🚨',
  advertencia: '⚠️',
  informativa: 'ℹ️',
};

const COLOR_MAP = {
  critica: 'var(--color-danger)',
  advertencia: 'var(--color-warning)',
  informativa: 'var(--color-accent)',
};

export function NotificationItem({ notif }) {
  const navigate = useNavigate();

  return (
    <div className="notification-item">
      <div className={`notification-icon-wrap notification-icon-${notif.tipo}`}>
        {ICONS[notif.tipo]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="notification-title" style={{ color: COLOR_MAP[notif.tipo] }}>
          {notif.titulo}
        </div>
        <div className="notification-desc">{notif.descripcion}</div>
        <div className="notification-meta">
          <span className="notification-meta-item">
            🏗️ {notif.obraNombre}
          </span>
          {notif.trabajador && (
            <span className="notification-meta-item">
              👷 {notif.trabajador}
            </span>
          )}
          <span className="notification-meta-item">
            🕐 {notif.tiempo}
          </span>
        </div>
      </div>
      <div className="notification-actions">
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => navigate(`/obras/${notif.obraId}`)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}
