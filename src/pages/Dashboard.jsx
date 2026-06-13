import { useNavigate } from 'react-router-dom';
import { obras } from '../data/mockData';
import { ProgressBar } from '../components/UI/ProgressBar';
import { Badge, getCumplimientoVariant } from '../components/UI/Badge';
import { useToast } from '../components/UI/Toast';

const METRICS = [
  {
    icon: '⚡',
    value: '8 min',
    label: 'Tiempo promedio de creación',
    sublabel: '−82% vs método tradicional',
    gradient: true,
  },
  {
    icon: '⏱️',
    value: '156 hrs',
    label: 'Horas administrativas ahorradas',
    sublabel: 'Este mes',
    gradient: true,
  },
  {
    icon: '✅',
    value: '94%',
    label: 'Documentación con firmas',
    sublabel: '+12% vs mes anterior',
    gradient: true,
  },
  {
    icon: '♻️',
    value: '78%',
    label: 'Reutilización de plantillas',
    sublabel: 'De todos los documentos',
    gradient: true,
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const showToast = useToast();

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div className="page-subtitle">Resumen ejecutivo de cumplimiento normativo</div>
      </div>

      {/* Metrics */}
      <div className="card-grid card-grid-4 mb-20">
        {METRICS.map((m, i) => (
          <div key={i} className="metric-card metric-card-gradient">
            <div className="metric-icon">{m.icon}</div>
            <div className="metric-value">{m.value}</div>
            <div className="metric-label">{m.label}</div>
            <div className="metric-sublabel">{m.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Firma del mes + tabla */}
      <div className="card-grid card-grid-2 mb-20">
        <div className="card">
          <div className="section-header">
            <div className="section-title">Cumplimiento por obra</div>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate('/obras')}>
              Ver todas
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Obra</th>
                  <th>Estado</th>
                  <th>Trabajadores</th>
                  <th>Cumplimiento</th>
                </tr>
              </thead>
              <tbody>
                {obras.map((o) => (
                  <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/obras/${o.id}`)}>
                    <td>
                      <span style={{ fontWeight: 500 }}>{o.nombre}</span>
                    </td>
                    <td>
                      <Badge variant={o.estado === 'Activo' ? 'primary' : 'mid'}>
                        {o.estado}
                      </Badge>
                    </td>
                    <td>{o.trabajadores}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, minWidth: 80 }}>
                          <ProgressBar value={o.cumplimiento} light />
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color:
                              o.cumplimiento >= 90
                                ? 'var(--color-primary)'
                                : o.cumplimiento >= 80
                                ? 'var(--color-accent)'
                                : o.cumplimiento >= 70
                                ? 'var(--color-warning)'
                                : 'var(--color-danger)',
                            minWidth: 36,
                          }}
                        >
                          {o.cumplimiento}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="section-title mb-16">Estado de firmas del mes</div>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-val text-primary">215</div>
                <div className="stat-lbl">Completadas</div>
              </div>
              <div className="stat-item">
                <div className="stat-val text-warning">9</div>
                <div className="stat-lbl">Pendientes</div>
              </div>
            </div>
            <ProgressBar value={Math.round((215 / 224) * 100)} light />
            <div style={{ fontSize: 11, color: 'var(--color-mid)', marginTop: 6 }}>
              {Math.round((215 / 224) * 100)}% de firmas completadas este mes
            </div>
          </div>

          <div className="cta-banner">
            <div className="cta-banner-text">
              <div className="cta-banner-title">
                Reduce el tiempo de creación de charlas
              </div>
              <div className="cta-banner-desc">
                De 30–60 minutos a menos de 10 minutos con plantillas reutilizables
              </div>
            </div>
            <button
              className="btn btn-secondary"
              style={{ flexShrink: 0 }}
              onClick={() => showToast('Funcionalidad disponible próximamente')}
            >
              Explorar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
