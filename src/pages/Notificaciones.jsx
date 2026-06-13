import { useState } from 'react';
import { notificaciones } from '../data/mockData';
import { NotificationItem } from '../components/UI/NotificationItem';

const FILTROS = ['Todas', 'Críticas', 'Advertencias', 'Informativas'];

const TIPO_MAP = {
  Críticas: 'critica',
  Advertencias: 'advertencia',
  Informativas: 'informativa',
};

export function Notificaciones() {
  const [filtro, setFiltro] = useState('Todas');
  const [showResueltas, setShowResueltas] = useState(false);

  const filtered =
    filtro === 'Todas'
      ? notificaciones
      : notificaciones.filter((n) => n.tipo === TIPO_MAP[filtro]);

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-title">Notificaciones</div>
        <div className="page-subtitle">Centro de alertas de cumplimiento normativo</div>
      </div>

      <div
        className="info-note info-note-alert mb-16"
        style={{
          background: 'rgba(61, 209, 177, 0.06)',
          borderColor: 'rgba(61, 209, 177, 0.3)',
          color: '#1a7a68',
        }}
      >
        <span>✨</span>
        <span>
          <strong>Las alertas se resuelven automáticamente</strong> cuando el documento es firmado o
          la capacitación es completada. No se requiere intervención manual.
        </span>
      </div>

      {/* Tabs: Activas / Resueltas */}
      <div className="tabs-nav">
        <button
          className={`tab-btn${!showResueltas ? ' active' : ''}`}
          onClick={() => setShowResueltas(false)}
        >
          Alertas activas
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 6,
              background: 'var(--color-danger)',
              color: 'white',
              borderRadius: 10,
              fontSize: 10,
              fontWeight: 700,
              padding: '1px 6px',
            }}
          >
            {notificaciones.length}
          </span>
        </button>
        <button
          className={`tab-btn${showResueltas ? ' active' : ''}`}
          onClick={() => setShowResueltas(true)}
        >
          Ver alertas resueltas
        </button>
      </div>

      {showResueltas ? (
        <div className="empty-state">
          <div className="empty-state-icon">✅</div>
          <div className="empty-state-title">Todo en orden, sin alertas pendientes</div>
          <div className="empty-state-desc">
            Aquí aparecerán las alertas que fueron resueltas automáticamente al completar los documentos o capacitaciones.
          </div>
        </div>
      ) : (
        <>
          <div className="filter-bar">
            {FILTROS.map((f) => (
              <button
                key={f}
                className={`filter-btn${filtro === f ? ' active' : ''}`}
                onClick={() => setFiltro(f)}
              >
                {f}
                {f !== 'Todas' && (
                  <span style={{ marginLeft: 4, opacity: 0.8 }}>
                    ({notificaciones.filter((n) => n.tipo === TIPO_MAP[f]).length})
                  </span>
                )}
                {f === 'Todas' && (
                  <span style={{ marginLeft: 4, opacity: 0.8 }}>({notificaciones.length})</span>
                )}
              </button>
            ))}
          </div>

          <div>
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🎉</div>
                <div className="empty-state-title">No hay alertas de este tipo</div>
              </div>
            ) : (
              filtered.map((n) => <NotificationItem key={n.id} notif={n} />)
            )}
          </div>
        </>
      )}
    </div>
  );
}
