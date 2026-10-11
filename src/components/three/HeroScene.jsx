import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PresentationControls } from '@react-three/drei';
import PhoneModel from './PhoneModel';
import Studio from './Studio';

const damp = (current, target, lambda, dt) => current + (target - current) * (1 - Math.exp(-lambda * dt));

// Dois iPhones: um de costas (câmeras) e outro de frente (tela acesa).
// Entram girando, flutuam e giram um pouco conforme a rolagem da página.
const Phones = () => {
  const group = useRef();
  const back = useRef();
  const front = useRef();
  const { size } = useThree();
  const scale = size.width < 640 ? 0.82 : size.width < 1024 ? 0.92 : 1;

  useFrame((_, dt) => {
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    if (back.current) {
      back.current.rotation.y = damp(back.current.rotation.y, -0.5 + scroll * 1.2, 4, dt);
      back.current.position.y = damp(back.current.position.y, -0.05, 3, dt); // entrada: sobe de baixo
    }
    if (front.current) {
      front.current.rotation.y = damp(front.current.rotation.y, Math.PI + 0.45 - scroll * 0.8, 3.5, dt);
    }
    if (group.current) {
      group.current.position.y = damp(group.current.position.y, scroll * 0.6, 4, dt);
    }
  });

  return (
    <group ref={group} scale={scale}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <group ref={back} position={[0.42, -2, 0.2]} rotation={[0.08, -4, 0.06]}>
          <PhoneModel design="plateau" color="#e8742f" />
        </group>
      </Float>
      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={front} position={[-0.48, 0.12, -0.55]} rotation={[0.05, Math.PI + 3, -0.05]}>
          <PhoneModel design="plateau" color="#33415c" />
        </group>
      </Float>
    </group>
  );
};

const HeroScene = () => {
  const wrapper = useRef();
  const [visible, setVisible] = useState(true);

  // Pausa a renderização quando o hero sai da tela (economiza bateria)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrapper.current) io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 3.6], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Studio />
        <PresentationControls
          global={false}
          cursor
          snap
          speed={1.4}
          rotation={[0, 0, 0]}
          polar={[-0.3, 0.3]}
          azimuth={[-1.2, 1.2]}
        >
          <Phones />
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default HeroScene;
