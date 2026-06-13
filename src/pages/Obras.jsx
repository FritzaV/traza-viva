import { useNavigate } from 'react-router-dom';
import { obras } from '../data/mockData';
import { Badge } from '../components/UI/Badge';
import { ProgressBar } from '../components/UI/ProgressBar';
import { useToast } from '../components/UI/Toast';

export function Obras() {
  const navigate = useNavigate();
  const showToast = useToast();

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <div className="page-title">Obras</div>
            <div className="page-subtitle">Gestión de proyectos y cumplimiento normativo</div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => showToast('Funcionalidad disponible próximamente')}
          >
            + Nueva obra
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Obra</th>
                <th>Estado</th>
                <th>Trabajadores</th>
                <th>Cumplimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {obras.map((o) => (
                <tr key={o.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{o.nombre}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-mid)', marginTop: 2 }}>
                      ID #{o.id}
                    </div>
                  </td>
                  <td>
                    <Badge variant={o.estado === 'Activo' ? 'primary' : 'mid'}>
                      {o.estado}
                    </Badge>
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{o.trabajadores}</span>
                    <span style={{ color: 'var(--color-mid)', fontSize: 12, marginLeft: 4 }}>trabajadores</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 140 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar value={o.cumplimiento} light />
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          minWidth: 36,
                          color:
                            o.cumplimiento >= 90
                              ? 'var(--color-primary)'
                              : o.cumplimiento >= 80
                              ? 'var(--color-accent)'
                              : o.cumplimiento >= 70
                              ? 'var(--color-warning)'
                              : 'var(--color-danger)',
                        }}
                      >
                        {o.cumplimiento}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => navigate(`/obras/${o.id}`)}
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
