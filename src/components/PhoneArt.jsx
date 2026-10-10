import { useId } from 'react';

// Ilustração vetorial da traseira do iPhone, desenhada por geração:
//   plateau  -> iPhone 17 Pro / 18 Pro (barra de câmeras de ponta a ponta)
//   vertical -> iPhone 16 / 17 (duas câmeras empilhadas)
//   diagonal -> iPhone 14 / 15 (duas câmeras na diagonal)
// Leve (alguns KB) e sempre correta para o modelo, ao contrário das fotos antigas.

const isLight = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
};

const Lens = ({ cx, cy, r, ring }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 3} fill={ring} />
    <circle cx={cx} cy={cy} r={r} fill="#0c0d10" />
    <circle cx={cx} cy={cy} r={r * 0.62} fill="#1b2234" />
    <circle cx={cx} cy={cy} r={r * 0.3} fill="#0a0c12" />
    <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.14} fill="#fff" opacity="0.45" />
  </g>
);

const Flash = ({ cx, cy, r = 6 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#f3eee2" />
    <circle cx={cx} cy={cy} r={r * 0.6} fill="#e2d9c3" />
  </g>
);

const PhoneArt = ({ design = 'plateau', color = '#2b2b30', className = '', title }) => {
  const uid = useId().replace(/:/g, '');
  const light = isLight(color);
  const shade = light ? '#000' : '#fff';
  const ring = light ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.16)';

  return (
    <svg
      viewBox="0 0 200 410"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* Moldura + traseira */}
      <rect x="2" y="2" width="196" height="406" rx="36" fill={color} />
      <rect x="2" y="2" width="196" height="406" rx="36" fill="none" stroke={shade} strokeOpacity="0.18" strokeWidth="3" />
      <rect x="7" y="7" width="186" height="396" rx="31" fill={`url(#sheen-${uid})`} />

      {design === 'plateau' && (
        <g>
          <rect x="7" y="12" width="186" height="104" rx="30" fill={shade} fillOpacity="0.1" />
          <rect x="7" y="12" width="186" height="104" rx="30" fill="none" stroke={shade} strokeOpacity="0.12" />
          <Lens cx={44} cy={42} r={17} ring={ring} />
          <Lens cx={44} cy={88} r={17} ring={ring} />
          <Lens cx={84} cy={65} r={17} ring={ring} />
          <Flash cx={160} cy={42} />
          <circle cx={160} cy={88} r={7} fill="#0c0d10" />
        </g>
      )}

      {design === 'vertical' && (
        <g>
          <rect x="18" y="18" width="56" height="112" rx="28" fill={shade} fillOpacity="0.1" />
          <rect x="18" y="18" width="56" height="112" rx="28" fill="none" stroke={shade} strokeOpacity="0.14" />
          <Lens cx={46} cy={46} r={18} ring={ring} />
          <Lens cx={46} cy={102} r={18} ring={ring} />
          <Flash cx={92} cy={34} r={5} />
        </g>
      )}

      {design === 'diagonal' && (
        <g>
          <rect x="16" y="16" width="96" height="96" rx="26" fill={shade} fillOpacity="0.1" />
          <rect x="16" y="16" width="96" height="96" rx="26" fill="none" stroke={shade} strokeOpacity="0.14" />
          <Lens cx={42} cy={42} r={17} ring={ring} />
          <Lens cx={86} cy={86} r={17} ring={ring} />
          <Flash cx={88} cy={38} r={5} />
        </g>
      )}

      {/* Botões laterais */}
      <rect x="0" y="120" width="2" height="26" rx="1" fill={shade} fillOpacity="0.3" />
      <rect x="0" y="160" width="2" height="40" rx="1" fill={shade} fillOpacity="0.3" />
      <rect x="198" y="140" width="2" height="54" rx="1" fill={shade} fillOpacity="0.3" />
    </svg>
  );
};

export default PhoneArt;
