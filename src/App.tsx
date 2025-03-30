
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { SolarSystem } from './components/SolarSystem'
import { PlanetInfo } from './components/PlanetInfo'
import { useState } from 'react'
import { Planet } from './types'

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)

  return (
    <div className="w-screen h-screen bg-black">
      <Canvas
        camera={{ position: [0, 20, 35], fov: 75 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#000010']} />
        <Stars radius={300} depth={60} count={20000} factor={7} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffd700" />
        <SolarSystem onPlanetSelect={setSelectedPlanet} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
        />
      </Canvas>
      {selectedPlanet && (
        <PlanetInfo 
          planet={selectedPlanet} 
          onClose={() => setSelectedPlanet(null)} 
        />
      )}
    </div>
  )
}