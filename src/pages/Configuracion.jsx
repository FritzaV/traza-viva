import { useToast } from '../components/UI/Toast';

const SECTIONS = [
  {
    title: 'Cuenta',
    icon: '👤',
    items: ['Perfil de usuario', 'Cambiar contraseña', 'Preferencias de notificación'],
  },
  {
    title: 'Organización',
    icon: '🏢',
    items: ['Datos de la empresa', 'Usuarios y permisos', 'Integración con Mutual de Seguridad'],
  },
  {
    title: 'Documentos',
    icon: '📄',
    items: ['Plantillas predeterminadas', 'Flujos de firma', 'Archivo y retención'],
  },
  {
    title: 'Facturación',
    icon: '💳',
    items: ['Plan actual', 'Historial de pagos', 'Métodos de pago'],
  },
];

export function Configuracion() {
  const showToast = useToast();

  return (
    <div className="page-body">
      <div className="page-header">
        <div className="page-title">Configuración</div>
        <div className="page-subtitle">Gestiona tu cuenta y preferencias de TrazaViva</div>
      </div>

      <div className="card-grid card-grid-2">
        {SECTIONS.map((section) => (
          <div key={section.title} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>{section.icon}</span>
              <div className="section-title">{section.title}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {section.items.map((item) => (
                <button
                  key={item}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between', textAlign: 'left' }}
                  onClick={() => showToast('Funcionalidad disponible próximamente')}
                >
                  <span>{item}</span>
                  <span style={{ color: 'var(--color-mid)' }}>›</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          padding: '14px 18px',
          background: 'var(--color-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>TrazaViva v1.0.0</div>
          <div style={{ fontSize: 12, color: 'var(--color-mid)', marginTop: 2 }}>
            Prototipo de demostración · Todos los datos son mock
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            background: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          Cumplimiento normativo sin fricción administrativa
        </div>
      </div>
    </div>
  );
}
