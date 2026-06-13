import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_RESULTS = {
  obras: [
    { id: 1, nombre: 'Edificio Los Aromos', cumplimiento: 87 },
    { id: 2, nombre: 'Centro Comercial Plaza', cumplimiento: 92 },
  ],
  trabajadores: [
    { id: 101, obraId: 1, nombre: 'Carlos Muñoz', cargo: 'Operario', obra: 'Edificio Los Aromos' },
    { id: 201, obraId: 2, nombre: 'Ana Pérez', cargo: 'Prevencionista', obra: 'Centro Comercial Plaza' },
  ],
  documentos: [
    { id: 'd1', nombre: 'Charla de Seguridad Trabajo en Altura', tipo: 'Charla', vecesUsado: 45 },
    { id: 'd6', nombre: 'Inducción de Ingreso a Faena', tipo: 'Inducción', vecesUsado: 89 },
  ],
};

export function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  }

  function handleChange(e) {
    setQuery(e.target.value);
    setOpen(e.target.value.length > 0);
  }

  function go(path) {
    navigate(path);
    setOpen(false);
    setQuery('');
  }

  return (
    <div className="topbar-search-wrap" ref={wrapRef}>
      <span className="topbar-search-icon">🔍</span>
      <input
        className="topbar-search-input"
        type="text"
        placeholder="Buscar trabajadores, obras o documentos"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => query.length > 0 && setOpen(true)}
      />
      {open && (
        <div className="search-dropdown">
          <div className="search-dropdown-section">
            <div className="search-dropdown-label">Obras</div>
            {MOCK_RESULTS.obras.map((o) => (
              <div
                key={o.id}
                className="search-dropdown-item"
                onClick={() => go(`/obras/${o.id}`)}
              >
                <div className="search-dropdown-item-icon">🏗️</div>
                <div>
                  <div className="search-dropdown-item-name">{o.nombre}</div>
                  <div className="search-dropdown-item-desc">{o.cumplimiento}% cumplimiento</div>
                </div>
              </div>
            ))}
          </div>
          <div className="search-dropdown-section">
            <div className="search-dropdown-label">Trabajadores</div>
            {MOCK_RESULTS.trabajadores.map((t) => (
              <div
                key={t.id}
                className="search-dropdown-item"
                onClick={() => go(`/obras/${t.obraId}/trabajadores/${t.id}`)}
              >
                <div className="search-dropdown-item-icon">👷</div>
                <div>
                  <div className="search-dropdown-item-name">{t.nombre}</div>
                  <div className="search-dropdown-item-desc">{t.cargo} · {t.obra}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="search-dropdown-section">
            <div className="search-dropdown-label">Documentos</div>
            {MOCK_RESULTS.documentos.map((d) => (
              <div
                key={d.id}
                className="search-dropdown-item"
                onClick={() => go('/documentos')}
              >
                <div className="search-dropdown-item-icon">📄</div>
                <div>
                  <div className="search-dropdown-item-name">{d.nombre}</div>
                  <div className="search-dropdown-item-desc">{d.tipo} · Usado {d.vecesUsado} veces</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
