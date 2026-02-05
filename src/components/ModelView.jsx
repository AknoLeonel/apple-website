import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import * as THREE from 'three'
import Lights from './Lights';
import Loader from './Loader';
import IPhone from './IPhone';
import { Suspense, memo } from "react";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  return (
    <View
      index={index}
      id={gsapType}
      // Tailwind: Controla a visibilidade baseado no índice (lógica original mantida)
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      {/* Iluminação Ambiente Suave para preencher sombras */}
      <ambientLight intensity={0.3} />

      {/* Câmera posicionada para melhor enquadramento */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {/* Componente de Luzes Otimizado (Cacheado) */}
      <Lights />

      {/* Controles de Rotação */}
      <OrbitControls 
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0 ,0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        // UX: Damping deixa a rotação "manteiga" (suave)
        enableDamping={true} 
        dampingFactor={0.05}
      /> 

      {/* Agrupamento do Modelo 3D */}
      <group 
        ref={groupRef} 
        name={index === 1 ? 'small' : 'large'} // CORREÇÃO DE SINTAXE AQUI
        position={[0, 0 ,0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone 
            // Ajuste de escala baseado no tamanho da tela/modelo
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}

// React.memo garante que o View 3D só renderize se as props mudarem
export default memo(ModelView);