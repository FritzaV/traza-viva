import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">TV</div>
          <span className="login-logo-name">TrazaViva</span>
        </div>
        <p className="login-tagline">
          Cumplimiento normativo sin fricción administrativa
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-input"
              placeholder="juan@empresa.cl"
              defaultValue="juan@empresa.cl"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              defaultValue="password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            style={{ justifyContent: 'center', marginTop: 20, padding: '11px 16px', fontSize: 14 }}
          >
            Iniciar sesión
          </button>
        </form>

        <div className="login-links">
          <a className="login-link" href="#" onClick={(e) => e.preventDefault()}>
            ¿Olvidaste tu contraseña?
          </a>
          <a className="login-link" href="#" onClick={(e) => e.preventDefault()}>
            Crear cuenta
          </a>
        </div>
      </div>
    </div>
  );
}
