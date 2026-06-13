import { useParams, useNavigate } from 'react-router-dom';
import { getTrabajadorById, getObraById, documentosTrabajador } from '../data/mockData';
import { Badge, getCumplimientoVariant } from '../components/UI/Badge';
import { ProgressBar } from '../components/UI/ProgressBar';

function getEstadoVariant(estado) {
  if (estado === 'Firmado') return 'primary';
  if (estado === 'Pendiente') return 'warning';
  if (estado === 'Vencido') return 'danger';
  return 'mid';
}

export function TrabajadorPerfil() {
  const { id, trabajadorId } = useParams();
  const navigate = useNavigate();
  const obra = getObraById(id);
  const trabajador = getTrabajadorById(id, trabajadorId);
  const docs = documentosTrabajador[parseInt(trabajadorId)] || [];

  if (!trabajador || !obra) {
    return (
      <div className="page-body">
        <div className="empty-state">
          <div className="empty-state-icon">👷</div>
          <div className="empty-state-title">Trabajador no encontrado</div>
          <button className="btn btn-primary mt-16" onClick={() => navigate(`/obras/${id}`)}>
            Volver a la obra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-body">
      {/* Header */}
      <div className="obra-header">
        <div className="obra-header-top">
          <div>
            <button
              className="btn btn-sm btn-secondary"
              style={{ marginBottom: 8 }}
              onClick={() => navigate(`/obras/${id}`)}
            >
              ← Volver a {obra.nombre}
            </button>
            <div className="obra-header-title">{trabajador.nombre}</div>
          </div>
          <Badge variant="dark">{trabajador.cargo}</Badge>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginTop: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-mid)', marginBottom: 2 }}>RUT</div>
            <div style={{ fontFamily: 'monospace', fontWeight: 600 }}>{trabajador.rut}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-mid)', marginBottom: 2 }}>Obra asignada</div>
            <div style={{ fontWeight: 600 }}>{obra.nombre}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-mid)', marginBottom: 4 }}>Cumplimiento</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, maxWidth: 120 }}>
                <ProgressBar value={trabajador.cumplimiento} light />
              </div>
              <Badge variant={getCumplimientoVariant(trabajador.cumplimiento)}>
                {trabajador.cumplimiento}%
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Docs table */}
      <div className="card">
        <div className="section-title mb-16">
          Documentos ({trabajador.docsCompletados}/{trabajador.docsTotal} completados)
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Documento</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{d.nombre}</td>
                  <td><Badge variant="dark">{d.tipo}</Badge></td>
                  <td>
                    <Badge variant={getEstadoVariant(d.estado)}>{d.estado}</Badge>
                  </td>
                  <td style={{ color: 'var(--color-mid)', fontSize: 12 }}>{d.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
