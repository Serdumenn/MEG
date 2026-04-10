export default function ProgressRing({ value = 0, max = 100, size = 120, stroke = 8, color = 'var(--accent)', label, sublabel }) {
  const radius      = (size - stroke) / 2;
  const circumf     = 2 * Math.PI * radius;
  const percent     = Math.min(1, Math.max(0, value / max));
  const dashOffset  = circumf * (1 - percent);
  const center      = size / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={center} cy={center} r={radius}
            fill="none"
            stroke="var(--bg-tertiary)"
            strokeWidth={stroke}
          />
          {/* Fill */}
          <circle
            cx={center} cy={center} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumf}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>

        {/* Center label */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 0,
        }}>
          {label && (
            <span style={{
              fontSize: size < 100 ? 'var(--text-xl)' : 'var(--text-3xl)',
              fontWeight: 700,
              color: color,
              lineHeight: 1,
            }}>
              {label}
            </span>
          )}
          {sublabel && (
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
