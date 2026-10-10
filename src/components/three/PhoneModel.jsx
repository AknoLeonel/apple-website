import { useMemo } from 'react';
import * as THREE from 'three';

// Modelo 3D procedural do iPhone (sem arquivos .glb para baixar).
// Unidade: 1 = 100 mm. Traseira voltada para +Z, tela para -Z.
//   design "plateau"  -> iPhone 17 Pro / 18 Pro (barra de câmeras de ponta a ponta)
//   design "vertical" -> iPhone 16 / 17 (duas câmeras empilhadas)
//   design "diagonal" -> iPhone 14 / 15 (duas câmeras na diagonal)

const W = 0.78;
const H = 1.63;
const D = 0.085;
const R = 0.125;

// Retângulo arredondado com raios independentes (tl, tr, br, bl)
const roundedRect = (w, h, r) => {
  const [tl, tr, br, bl] = Array.isArray(r) ? r : [r, r, r, r];
  const x = -w / 2, y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + bl, y);
  s.lineTo(x + w - br, y);
  s.quadraticCurveTo(x + w, y, x + w, y + br);
  s.lineTo(x + w, y + h - tr);
  s.quadraticCurveTo(x + w, y + h, x + w - tr, y + h);
  s.lineTo(x + tl, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - tl);
  s.lineTo(x, y + bl);
  s.quadraticCurveTo(x, y, x + bl, y);
  return s;
};

// ShapeGeometry usa as coordenadas da forma como UV; normaliza para 0..1
const planeFromShape = (shape) => {
  const g = new THREE.ShapeGeometry(shape, 48);
  g.computeBoundingBox();
  const { min, max } = g.boundingBox;
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) - min.x) / (max.x - min.x), (pos.getY(i) - min.y) / (max.y - min.y));
  }
  return g;
};

const extrude = (shape, depth, bevel, segments = 6) => {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: segments,
    curveSegments: 48,
  });
  g.translate(0, 0, -depth / 2);
  return g;
};

const shade = (hex, amount) => {
  const c = new THREE.Color(hex);
  const hsl = {};
  c.getHSL(hsl);
  c.setHSL(hsl.h, hsl.s, THREE.MathUtils.clamp(hsl.l + amount, 0, 1));
  return c;
};

// Papel de parede da tela (gerado em canvas)
let wallpaperTexture;
const getWallpaper = () => {
  if (wallpaperTexture) return wallpaperTexture;
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 1070;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#05060a';
  ctx.fillRect(0, 0, c.width, c.height);
  const blob = (x, y, r, color) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);
  };
  blob(120, 760, 520, 'rgba(232,116,47,0.95)');
  blob(430, 980, 420, 'rgba(255,60,90,0.7)');
  blob(420, 360, 460, 'rgba(41,120,255,0.75)');
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.textAlign = 'center';
  ctx.font = '600 34px -apple-system, Helvetica, Arial, sans-serif';
  ctx.fillText('sábado, 10 de outubro', 256, 200);
  ctx.font = '700 150px -apple-system, Helvetica, Arial, sans-serif';
  ctx.fillText('9:41', 256, 340);
  wallpaperTexture = new THREE.CanvasTexture(c);
  wallpaperTexture.colorSpace = THREE.SRGBColorSpace;
  wallpaperTexture.anisotropy = 4;
  return wallpaperTexture;
};

const Lens = ({ position, r = 0.06, ringColor, height = 0.024 }) => (
  <group position={position} rotation={[Math.PI / 2, 0, 0]}>
    {/* anel de metal */}
    <mesh position={[0, height / 2, 0]}>
      <cylinderGeometry args={[r, r * 1.03, height, 64]} />
      <meshPhysicalMaterial color={ringColor} metalness={1} roughness={0.15} clearcoat={1} />
    </mesh>
    {/* borda chanfrada polida */}
    <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[r * 0.9, r * 0.1, 16, 64]} />
      <meshPhysicalMaterial color="#d9d9de" metalness={1} roughness={0.08} />
    </mesh>
    {/* vidro de safira */}
    <mesh position={[0, height + 0.001, 0]}>
      <cylinderGeometry args={[r * 0.82, r * 0.82, 0.002, 64]} />
      <meshPhysicalMaterial color="#14161c" metalness={0.7} roughness={0.04} clearcoat={1} clearcoatRoughness={0} />
    </mesh>
    {/* elementos internos com reflexo azulado */}
    <mesh position={[0, height + 0.0022, 0]}>
      <cylinderGeometry args={[r * 0.56, r * 0.56, 0.001, 48]} />
      <meshPhysicalMaterial color="#25336b" emissive="#0b1336" emissiveIntensity={0.6} metalness={0.8} roughness={0.1} iridescence={1} />
    </mesh>
    <mesh position={[0, height + 0.003, 0]}>
      <cylinderGeometry args={[r * 0.28, r * 0.28, 0.001, 32]} />
      <meshStandardMaterial color="#030305" roughness={0.05} metalness={0.5} />
    </mesh>
    <mesh position={[-r * 0.28, height + 0.0035, -r * 0.28]}>
      <cylinderGeometry args={[r * 0.09, r * 0.09, 0.001, 24]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
    </mesh>
  </group>
);

const Dot = ({ position, r, color, emissive, height = 0.006 }) => (
  <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
    <cylinderGeometry args={[r, r, height, 40]} />
    <meshPhysicalMaterial color={color} emissive={emissive || '#000'} emissiveIntensity={emissive ? 0.25 : 0} roughness={0.25} clearcoat={1} />
  </mesh>
);

const PhoneModel = ({ design = 'plateau', color = '#e8742f', showScreen = true, ...props }) => {
  const geo = useMemo(() => {
    const bevel = 0.022;
    return {
      body: extrude(roundedRect(W - bevel * 2, H - bevel * 2, R - bevel), D - bevel * 2, bevel, 10),
      screen: planeFromShape(roundedRect(W - 0.05, H - 0.05, R - 0.03)),
      glass: new THREE.ShapeGeometry(roundedRect(W - 0.03, H - 0.03, R - 0.015), 48),
      island: new THREE.ShapeGeometry(roundedRect(0.2, 0.058, 0.029), 24),
      plateau: extrude(roundedRect(W - 0.02, 0.36, [R - 0.01, R - 0.01, 0.07, 0.07]), 0.012, 0.008, 6),
      magsafePanel: new THREE.ShapeGeometry(roundedRect(W - 0.14, 0.86, 0.05), 32),
      pill: extrude(roundedRect(0.25, 0.47, 0.125), 0.006, 0.006, 6),
      square: extrude(roundedRect(0.37, 0.37, 0.1), 0.006, 0.006, 6),
    };
  }, []);

  const c = useMemo(() => {
    const base = new THREE.Color(color);
    const light = base.getHSL({}).l > 0.6;
    return {
      base,
      frame: design === 'plateau' ? base : shade(color, light ? -0.12 : 0.04),
      plateau: shade(color, light ? -0.03 : 0.03),
      ring: shade(color, light ? -0.35 : 0.08),
      glass: shade(color, light ? 0.02 : 0.06),
    };
  }, [color, design]);

  const zBack = D / 2;
  const top = H / 2;

  return (
    <group {...props}>
      {/* Corpo */}
      <mesh geometry={geo.body} castShadow>
        <meshPhysicalMaterial
          color={c.frame}
          metalness={design === 'plateau' ? 0.55 : 0.85}
          roughness={design === 'plateau' ? 0.38 : 0.22}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
        />
      </mesh>

      {/* Traseira */}
      {design === 'plateau' ? (
        <>
          <mesh geometry={geo.plateau} position={[0, top - 0.19, zBack + 0.006]}>
            <meshPhysicalMaterial color={c.plateau} metalness={0.55} roughness={0.32} clearcoat={0.5} clearcoatRoughness={0.25} />
          </mesh>
          {/* painel de vidro (MagSafe) */}
          <mesh geometry={geo.magsafePanel} position={[0, -0.27, zBack + 0.0006]}>
            <meshPhysicalMaterial color={c.frame} metalness={0.55} roughness={0.44} clearcoat={0.3} clearcoatRoughness={0.5} opacity={0.6} transparent />
          </mesh>
          <Lens position={[-0.24, top - 0.105, zBack + 0.019]} r={0.074} ringColor={c.ring} />
          <Lens position={[-0.24, top - 0.275, zBack + 0.019]} r={0.074} ringColor={c.ring} />
          <Lens position={[-0.075, top - 0.19, zBack + 0.019]} r={0.074} ringColor={c.ring} />
          <Dot position={[0.25, top - 0.11, zBack + 0.02]} r={0.026} color="#f2ecdf" emissive="#ffeccc" />
          <Dot position={[0.25, top - 0.26, zBack + 0.02]} r={0.028} color="#0a0a0c" />
          <Dot position={[0.16, top - 0.11, zBack + 0.02]} r={0.008} color="#0a0a0c" />
        </>
      ) : (
        <>
          <mesh geometry={geo.glass} position={[0, 0, zBack + 0.0008]}>
            <meshPhysicalMaterial color={c.glass} metalness={0.05} roughness={0.42} clearcoat={0.9} clearcoatRoughness={0.35} />
          </mesh>
          {design === 'vertical' ? (
            <>
              <mesh geometry={geo.pill} position={[-0.215, top - 0.3, zBack + 0.007]}>
                <meshPhysicalMaterial color={c.glass} metalness={0.1} roughness={0.15} clearcoat={1} transmission={0} />
              </mesh>
              <Lens position={[-0.215, top - 0.185, zBack + 0.013]} r={0.064} ringColor={c.ring} height={0.018} />
              <Lens position={[-0.215, top - 0.415, zBack + 0.013]} r={0.064} ringColor={c.ring} height={0.018} />
              <Dot position={[-0.06, top - 0.12, zBack + 0.004]} r={0.02} color="#f2ecdf" emissive="#ffeccc" />
            </>
          ) : (
            <>
              <mesh geometry={geo.square} position={[-0.17, top - 0.23, zBack + 0.007]}>
                <meshPhysicalMaterial color={c.glass} metalness={0.1} roughness={0.15} clearcoat={1} />
              </mesh>
              <Lens position={[-0.255, top - 0.145, zBack + 0.013]} r={0.064} ringColor={c.ring} height={0.018} />
              <Lens position={[-0.085, top - 0.315, zBack + 0.013]} r={0.064} ringColor={c.ring} height={0.018} />
              <Dot position={[-0.075, top - 0.135, zBack + 0.012]} r={0.02} color="#f2ecdf" emissive="#ffeccc" />
            </>
          )}
        </>
      )}

      {/* Frente: vidro preto + tela + Dynamic Island */}
      <group position={[0, 0, -zBack - 0.0008]} rotation={[0, Math.PI, 0]}>
        <mesh geometry={geo.glass}>
          <meshPhysicalMaterial color="#030303" roughness={0.04} metalness={0.1} clearcoat={1} clearcoatRoughness={0} />
        </mesh>
        {showScreen && (
          <mesh geometry={geo.screen} position={[0, 0, 0.0005]}>
            <meshBasicMaterial map={getWallpaper()} toneMapped={false} />
          </mesh>
        )}
        <mesh geometry={geo.island} position={[0, H / 2 - 0.07, 0.001]}>
          <meshBasicMaterial color="#000" />
        </mesh>
      </group>

      {/* Botões laterais */}
      {[
        [-W / 2 - 0.004, 0.42, 0.09],
        [-W / 2 - 0.004, 0.28, 0.12],
        [-W / 2 - 0.004, 0.13, 0.12],
        [W / 2 + 0.004, 0.25, 0.2],
        [W / 2 + 0.004, -0.2, 0.1],
      ].map(([x, y, h]) => (
        <mesh key={`${x}${y}`} position={[x, y, 0]}>
          <boxGeometry args={[0.01, h, 0.03]} />
          <meshPhysicalMaterial color={c.frame} metalness={0.8} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
};

export default PhoneModel;
