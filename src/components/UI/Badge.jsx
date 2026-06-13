export function Badge({ children, variant = 'mid' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export function getCumplimientoVariant(pct) {
  if (pct >= 90) return 'primary';
  if (pct >= 80) return 'accent';
  if (pct >= 70) return 'warning';
  return 'danger';
}

export function getCumplimientoColor(pct) {
  if (pct >= 90) return 'var(--color-primary)';
  if (pct >= 80) return 'var(--color-accent)';
  if (pct >= 70) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export function getProgressClass(pct) {
  if (pct >= 90) return 'progress-color-primary';
  if (pct >= 80) return 'progress-color-accent';
  if (pct >= 70) return 'progress-color-warning';
  return 'progress-color-danger';
}
