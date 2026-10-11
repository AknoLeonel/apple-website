import { Environment, Lightformer } from '@react-three/drei';

// Iluminação de estúdio feita só com "softboxes" virtuais:
// reflexos realistas no metal sem baixar arquivos HDR.
const Studio = ({ warm = '#ffb27a' }) => (
  <>
    <ambientLight intensity={0.25} />
    <directionalLight position={[3, 4, 5]} intensity={2.2} />
    <spotLight position={[5, 1, 3]} angle={0.5} penumbra={1} intensity={25} color={warm} />
    <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#9cc4ff" />
    <Environment resolution={512} frames={1}>
      <Lightformer form="rect" intensity={4} position={[0, 4, 3]} scale={[8, 1.5, 1]} rotation-x={Math.PI / 2.4} />
      <Lightformer form="rect" intensity={2.5} position={[-4, 1, 2]} scale={[1, 6, 1]} rotation-y={Math.PI / 2.5} />
      <Lightformer form="rect" intensity={4} position={[4, 0, 2]} scale={[1.5, 6, 1]} rotation-y={-Math.PI / 2.5} color={warm} />
      <Lightformer form="ring" intensity={1.5} position={[0, -3, 4]} scale={2} color="#7fb0ff" />
      <Lightformer form="rect" intensity={1} position={[0, 0, -5]} scale={[10, 10, 1]} color="#202024" />
    </Environment>
  </>
);

export default Studio;
