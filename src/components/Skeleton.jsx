import './Skeleton.css';

export function Skeleton({ width, height, radius, style }) {
  return (
    <div
      className="skeleton-pulse"
      style={{
        width: width || '100%',
        height: height || '1rem',
        borderRadius: radius || '6px',
        ...style,
      }}
    />
  );
}

export function SkeletonCard({ height }) {
  return (
    <div className="skeleton-card">
      <Skeleton height={height || '120px'} radius="12px" />
    </div>
  );
}

export function SkeletonText({ lines = 3, widths }) {
  const defaultWidths = ['100%', '85%', '60%'];
  return (
    <div className="skeleton-text-group">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          width={widths?.[i] || defaultWidths[i] || '100%'}
          height="0.875rem"
        />
      ))}
    </div>
  );
}
