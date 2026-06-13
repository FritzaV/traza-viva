import { useState } from 'react';
import { documentosGlobales } from '../data/mockData';
import { Badge } from '../components/UI/Badge';
import { useToast } from '../components/UI/Toast';

const TIPO_COLORS = {
  Charla: 'primary',
  Procedimiento: 'accent',
  Reglamento: 'mid',
  Curso: 'warning',
  Inducción: 'dark',
  Programa: 'danger',
};

export function Documentos() {
  const [tipoFiltro, setTipoFiltro] = useState('Todos');
  const showToast = useToast();
  const tipos = ['Todos', ...new Set(documentosGlobales.map((d) => d.tipo))];
  const filtered =
    tipoFiltro === 'Todos' ? documentosGlobales : documentosGlobales.filter((d) => d.tipo === tipoFiltro);

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <div className="page-title">Biblioteca de Documentos</div>
            <div className="page-subtitle">Plantillas y documentos reutilizables para todas las obras</div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => showToast('Funcionalidad disponible próximamente')}
          >
            + Nuevo documento
          </button>
        </div>
      </div>

      <div className="card-grid card-grid-4 mb-20">
        <div className="metric-card">
          <div className="metric-icon">📄</div>
          <div className="metric-value">{documentosGlobales.length}</div>
          <div className="metric-label">Documentos totales</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">♻️</div>
          <div className="metric-value" style={{ color: 'var(--color-primary)' }}>
            {documentosGlobales.reduce((a, d) => a + d.vecesUsado, 0)}
          </div>
          <div className="metric-label">Total reutilizaciones</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-value" style={{ color: 'var(--color-accent)' }}>
            {Math.round(documentosGlobales.reduce((a, d) => a + d.duracion, 0) / documentosGlobales.length)} min
          </div>
          <div className="metric-label">Duración promedio</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🏷️</div>
          <div className="metric-value">{tipos.length - 1}</div>
          <div className="metric-label">Tipos de documentos</div>
        </div>
      </div>

      <div className="filter-bar">
        {tipos.map((t) => (
          <button
            key={t}
            className={`filter-btn${tipoFiltro === t ? ' active' : ''}`}
            onClick={() => setTipoFiltro(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Documento</th>
                <th>Tipo</th>
                <th>Cargos aplicables</th>
                <th>Veces usado</th>
                <th>Duración</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 500 }}>{d.nombre}</td>
                  <td>
                    <Badge variant={TIPO_COLORS[d.tipo] || 'mid'}>{d.tipo}</Badge>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {d.cargos.map((c) => (
                        <Badge key={c} variant="dark">{c}</Badge>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                      {d.vecesUsado}
                    </span>
                    <span style={{ color: 'var(--color-mid)', fontSize: 12, marginLeft: 4 }}>veces</span>
                  </td>
                  <td style={{ color: 'var(--color-mid)' }}>{d.duracion} min</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => showToast('Funcionalidad disponible próximamente')}
                      >
                        Ver
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => showToast('Funcionalidad disponible próximamente')}
                      >
                        Usar
                      </button>
                    </div>
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
