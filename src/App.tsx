
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { SolarSystem } from './components/SolarSystem'
import { PlanetInfo } from './components/PlanetInfo'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useState, Suspense, useCallback } from 'react'
import { Planet } from './types'

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)

  const handlePlanetSelect = useCallback((planet: Planet) => {
    setSelectedPlanet(planet)
  }, [])

  return (
    <div className="w-screen h-screen bg-black relative">
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 20, 35], fov: 75 }}
          className="w-full h-full"
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <color attach="background" args={['#000010']} />
          <Stars 
            radius={300} 
            depth={60} 
            count={10000}
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

        <div className="absolute top-4 left-4 text-white text-sm">
          Click on any planet to learn more
        </div>

        {selectedPlanet && (
          <PlanetInfo 
            planet={selectedPlanet} 
            onClose={() => setSelectedPlanet(null)} 
          />
        )}
      </ErrorBoundary>
    </div>
  )
}