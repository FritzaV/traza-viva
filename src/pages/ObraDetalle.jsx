import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  obras,
  trabajadoresPorObra,
  cargosPorObra,
  documentosPorObra,
  getObraById,
} from '../data/mockData';
import { Badge, getCumplimientoVariant } from '../components/UI/Badge';
import { ProgressBar } from '../components/UI/ProgressBar';
import { useToast } from '../components/UI/Toast';

const TABS = ['Resumen', 'Trabajadores', 'Cargos y Roles', 'Documentos'];

function TabResumen({ obra }) {
  const trabajadores = trabajadoresPorObra[obra.id] || [];
  const docs = documentosPorObra[obra.id] || [];
  const totalDocs = trabajadores.reduce((a, t) => a + t.docsTotal, 0);
  const completados = trabajadores.reduce((a, t) => a + t.docsCompletados, 0);

  return (
    <div>
      <div className="card-grid card-grid-4 mb-20">
        <div className="card">
          <div className="metric-icon">👷</div>
          <div className="metric-value">{obra.trabajadores}</div>
          <div className="metric-label">Trabajadores activos</div>
        </div>
        <div className="card">
          <div className="metric-icon">📄</div>
          <div className="metric-value">{totalDocs}</div>
          <div className="metric-label">Documentos totales</div>
        </div>
        <div className="card">
          <div className="metric-icon">📊</div>
          <div className="metric-value"
            style={{
              color:
                obra.cumplimiento >= 90
                  ? 'var(--color-primary)'
                  : obra.cumplimiento >= 80
                  ? 'var(--color-accent)'
                  : obra.cumplimiento >= 70
                  ? 'var(--color-warning)'
                  : 'var(--color-danger)',
            }}
          >
            {obra.cumplimiento}%
          </div>
          <div className="metric-label">Cumplimiento general</div>
          <div style={{ marginTop: 8 }}>
            <ProgressBar value={obra.cumplimiento} light />
          </div>
        </div>
        <div className="card">
          <div className="metric-icon">✍️</div>
          <div className="metric-value text-warning">{obra.firmasPendientes}</div>
          <div className="metric-label">Firmas pendientes</div>
        </div>
      </div>

      <div className="card">
        <div className="section-title mb-16">Cumplimiento por trabajador</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Trabajador</th>
                <th>Cargo</th>
                <th>Documentos</th>
                <th>Cumplimiento</th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{t.nombre}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-mid)' }}>{t.rut}</div>
                  </td>
                  <td><Badge variant="dark">{t.cargo}</Badge></td>
                  <td>{t.docsCompletados}/{t.docsTotal}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar value={t.cumplimiento} light />
                      </div>
                      <Badge variant={getCumplimientoVariant(t.cumplimiento)}>
                        {t.cumplimiento}%
                      </Badge>
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

function TabTrabajadores({ obra }) {
  const navigate = useNavigate();
  const showToast = useToast();
  const trabajadores = trabajadoresPorObra[obra.id] || [];

  return (
    <div>
      <div className="section-header mb-16">
        <div />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => showToast('Funcionalidad disponible próximamente')}
          >
            Desde archivo
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => showToast('Funcionalidad disponible próximamente')}
          >
            + Añadir trabajador
          </button>
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>RUT</th>
                <th>Cargo</th>
                <th>Documentos</th>
                <th>Cumplimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 500 }}>{t.nombre}</td>
                  <td style={{ color: 'var(--color-mid)', fontFamily: 'monospace', fontSize: 12 }}>
                    {t.rut}
                  </td>
                  <td><Badge variant="dark">{t.cargo}</Badge></td>
                  <td>{t.docsCompletados}/{t.docsTotal}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar value={t.cumplimiento} light />
                      </div>
                      <Badge variant={getCumplimientoVariant(t.cumplimiento)}>
                        {t.cumplimiento}%
                      </Badge>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => navigate(`/obras/${obra.id}/trabajadores/${t.id}`)}
                    >
                      Ver perfil
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

function TabCargos({ obra }) {
  const cargos = cargosPorObra[obra.id] || [];

  return (
    <div>
      <div className="info-note mb-16">
        <span>📋</span>
        <span>
          El cargo es el eje del cumplimiento normativo según DS N°44 y Mutual de Seguridad.
          Cada cargo define los documentos requeridos, riesgos y EPP obligatorios.
        </span>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Cargo</th>
                <th>Riesgos asociados</th>
                <th>EPP obligatorios</th>
                <th>Docs requeridos</th>
                <th>Trabajadores</th>
                <th>Cumplimiento</th>
              </tr>
            </thead>
            <tbody>
              {cargos.map((c, i) => (
                <tr key={i}>
                  <td>
                    <span style={{ fontWeight: 600 }}>{c.cargo}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {c.riesgos.map((r) => (
                        <Badge key={r} variant="warning">{r}</Badge>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {c.epp.map((e) => (
                        <Badge key={e} variant="accent">{e}</Badge>
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 600 }}>{c.docsRequeridos}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>{c.trabajadores}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar value={c.cumplimiento} light />
                      </div>
                      <Badge variant={getCumplimientoVariant(c.cumplimiento)}>
                        {c.cumplimiento}%
                      </Badge>
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

function TabDocumentos({ obra }) {
  const [tipoFiltro, setTipoFiltro] = useState('Todos');
  const docs = documentosPorObra[obra.id] || [];
  const tipos = ['Todos', ...new Set(docs.map((d) => d.tipo))];
  const filtered = tipoFiltro === 'Todos' ? docs : docs.filter((d) => d.tipo === tipoFiltro);

  return (
    <div>
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
                <th>Veces usado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{d.nombre}</td>
                  <td><Badge variant="dark">{d.tipo}</Badge></td>
                  <td>{d.vecesUsado} veces</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ObraDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Resumen');
  const obra = getObraById(id);

  if (!obra) {
    return (
      <div className="page-body">
        <div className="empty-state">
          <div className="empty-state-icon">🏗️</div>
          <div className="empty-state-title">Obra no encontrada</div>
          <button className="btn btn-primary mt-16" onClick={() => navigate('/obras')}>
            Volver a obras
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-body">
      {/* Obra header */}
      <div className="obra-header">
        <div className="obra-header-top">
          <div>
            <button
              className="btn btn-sm btn-secondary"
              style={{ marginBottom: 8 }}
              onClick={() => navigate('/obras')}
            >
              ← Volver a obras
            </button>
            <div className="obra-header-title">{obra.nombre}</div>
          </div>
          <Badge variant={obra.estado === 'Activo' ? 'primary' : 'mid'}>{obra.estado}</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color:
                obra.cumplimiento >= 90
                  ? 'var(--color-primary)'
                  : obra.cumplimiento >= 80
                  ? 'var(--color-accent)'
                  : obra.cumplimiento >= 70
                  ? 'var(--color-warning)'
                  : 'var(--color-danger)',
            }}
          >
            {obra.cumplimiento}%
          </span>
          <div style={{ flex: 1, maxWidth: 300 }}>
            <ProgressBar value={obra.cumplimiento} light size="lg" />
          </div>
          <span style={{ fontSize: 13, color: 'var(--color-mid)' }}>cumplimiento general</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Resumen' && <TabResumen obra={obra} />}
      {activeTab === 'Trabajadores' && <TabTrabajadores obra={obra} />}
      {activeTab === 'Cargos y Roles' && <TabCargos obra={obra} />}
      {activeTab === 'Documentos' && <TabDocumentos obra={obra} />}
    </div>
  );
}
