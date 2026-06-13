import { getProgressClass } from './Badge';

export function ProgressBar({ value, light = false, showLabel = false, size = 'md' }) {
  const colorClass = getProgressClass(value);
  const height = size === 'sm' ? '4px' : size === 'lg' ? '8px' : '6px';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        className={`progress-bar-wrap ${light ? 'light' : ''}`}
        style={{ flex: 1, height }}
      >
        <div
          className={`progress-bar-fill ${colorClass}`}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
      {showLabel && (
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-mid)', minWidth: 32 }}>
          {value}%
        </span>
      )}
    </div>
  );
}
