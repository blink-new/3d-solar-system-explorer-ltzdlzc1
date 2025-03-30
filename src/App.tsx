
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { SolarSystem } from './components/SolarSystem'
import { PlanetInfo } from './components/PlanetInfo'
import { useState, Suspense } from 'react'
import { Planet } from './types'

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)

  return (
    <div className="w-screen h-screen bg-black relative">
      <Canvas
        camera={{ position: [0, 20, 35], fov: 75 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#000010']} />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} />
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <SolarSystem onPlanetSelect={setSelectedPlanet} />
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
        />
      </Canvas>
      
      {/* Loading indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl">
        Loading Solar System...
      </div>

      {selectedPlanet && (
        <PlanetInfo 
          planet={selectedPlanet} 
          onClose={() => setSelectedPlanet(null)} 
        />
      )}
    </div>
  )
}