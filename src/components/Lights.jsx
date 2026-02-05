import { Environment, Lightformer } from "@react-three/drei";
import { memo } from "react";

const Lights = () => {
  return (
    // group organiza a cena. O nome 'lights' ajuda em debuggers 3D.
    <group name="lights">
      {/**
       * Otimização de Performance:
       * frames={1} -> Renderiza o ambiente apenas no primeiro quadro e faz cache.
       * Isso economiza MUITA GPU, essencial para mobile.
       * resolution={256} -> Textura 256x256 é suficiente para reflexos difusos e leve para carregar.
       */}
      <Environment resolution={256} frames={1}>
        <group>
          {/** * Lightformers criam aqueles reflexos "retangulares" bonitos 
           * que vemos em comerciais de carros e celulares (Studio Lighting).
           */}
          <Lightformer
            form="rect"
            intensity={10}
            position={[-1, 0, -10]}
            scale={10}
            color={"#495057"}
          />
          <Lightformer
            form="rect"
            intensity={10}
            position={[-10, 2, 1]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
          <Lightformer
            form="rect"
            intensity={10}
            position={[10, 0, 1]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
        </group>
      </Environment>

      {/**
       * Spotlights: Luzes direcionais para destacar o objeto principal.
       * Ajudam a criar sombras e profundidade no modelo 3D.
       */}
      <spotLight
        position={[-2, 10, 5]}
        angle={0.15}
        penumbra={1} // Borda suave da sombra
        decay={0} // Luz não enfraquece com a distância (estilo estúdio infinito)
        intensity={Math.PI * 0.2}
        color={"#f8f9fa"}
      />
      <spotLight
        position={[0, -25, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI * 0.2}
        color={"#f8f9fa"}
      />
      <spotLight
        position={[0, 15, 5]}
        angle={0.15}
        penumbra={1}
        decay={0.1}
        intensity={Math.PI * 3}
      />
    </group>
  );
};

// React.memo previne re-renderizações desnecessárias das luzes
export default memo(Lights);