// Página auxiliar (só no modo dev) usada para gerar as fotos dos produtos
// a partir do modelo 3D. Veja tools/render-products.cjs.
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import PhoneModel from '../src/components/three/PhoneModel';
import Studio from '../src/components/three/Studio';

const q = new URLSearchParams(location.search);
const num = (k, d) => (q.has(k) ? Number(q.get(k)) : d);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Canvas
    dpr={num('dpr', 2)}
    gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
    camera={{ position: [0, 0, num('z', 3.1)], fov: 35 }}
    onCreated={() => setTimeout(() => (window.__ready = true), 1500)}
  >
    <Studio />
    <PhoneModel
      design={q.get('design') || 'plateau'}
      color={'#' + (q.get('color') || 'e8742f')}
      rotation={[num('rx', 0), num('ry', 0), num('rz', 0)]}
    />
  </Canvas>
);
