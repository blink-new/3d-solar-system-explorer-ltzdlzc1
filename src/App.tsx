
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { SolarSystem } from './components/SolarSystem'
import { PlanetInfo } from './components/PlanetInfo'
import { useState, Suspense, useCallback } from 'react'
import { Planet } from './types'

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)

  // Memoize planet selection handler
  const handlePlanetSelect = useCallback((planet: Planet) => {
    setSelectedPlanet(planet)
  }, [])

  return (
    <div className="w-screen h-screen bg-black relative">
      <Canvas
        camera={{ position: [0, 20, 35], fov: 75 }}
        className="w-full h-full"
        dpr={[1, 2]} // Limit max DPR to 2
        performance={{ min: 0.5 }} // Allow frame rate to drop to 30 FPS
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <color attach="background" args={['#000010']} />
        <Stars 
          radius={300} 
          depth={60} 
          count={10000} // Reduced star count
          factor={7} 
          saturation={0} 
        />
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <SolarSystem onPlanetSelect={handlePlanetSelect} />
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
          enableDamping
          dampingFactor={0.05}
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