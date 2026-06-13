import { useNavigate, useMatch } from 'react-router-dom';
import { SearchDropdown } from '../UI/SearchDropdown';
import { ProgressBar } from '../UI/ProgressBar';
import { obras } from '../../data/mockData';

function useCurrentContext() {
  const obraMatch = useMatch('/obras/:id/*');
  if (obraMatch) {
    const obra = obras.find((o) => o.id === parseInt(obraMatch.params.id));
    if (obra) return { title: obra.nombre, cumplimiento: obra.cumplimiento };
  }
  return { title: 'Vista general', cumplimiento: null };
}

export function Topbar() {
  const navigate = useNavigate();
  const { title, cumplimiento } = useCurrentContext();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">{title}</div>
        {cumplimiento !== null && (
          <div className="topbar-progress-row">
            <div style={{ width: 80 }}>
              <ProgressBar value={cumplimiento} light size="sm" />
            </div>
            <span className="topbar-progress-label">{cumplimiento}% cumplimiento</span>
          </div>
        )}
      </div>

      <SearchDropdown />

      <div className="topbar-right">
        <div className="topbar-avatar">JP</div>
        <div className="topbar-user-info">
          <span className="topbar-user-name">Juan Pérez</span>
          <span className="topbar-user-role">Administrador</span>
        </div>
        <button className="btn-logout" onClick={() => navigate('/login')}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
