import { Html, useProgress } from '@react-three/drei'
import React from 'react'

const Loader = () => {
  // Hook para pegar a porcentagem real de carregamento do 3D
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black/80 rounded-xl px-10 py-5 backdrop-blur-md">
        {/* Spinner animado estilo Apple */}
        <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin mb-3"></div>
        
        {/* Texto com a porcentagem */}
        <p className="text-gray text-sm font-semibold">
          Carregando 3D... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  )
}

export default Loader