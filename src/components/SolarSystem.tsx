
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { planets } from '../data/planets'
import { Planet as PlanetType } from '../types'
import * as THREE from 'three'

interface SolarSystemProps {
  onPlanetSelect: (planet: PlanetType) => void
}

export function SolarSystem({ onPlanetSelect }: SolarSystemProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    
    planets.forEach((planet, index) => {
      const planetMesh = groupRef.current?.children[index + 1] // +1 to skip the sun
      if (planetMesh) {
        // Update planet position in orbit
        const angle = elapsedTime * planet.orbitSpeed
        planetMesh.position.x = Math.cos(angle) * planet.orbitRadius
        planetMesh.position.z = Math.sin(angle) * planet.orbitRadius
        
        // Rotate planet
        planetMesh.rotation.y += planet.rotationSpeed
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>

      {/* Planets */}
      {planets.map((planet) => (
        <group key={planet.id}>
          {/* Orbit path */}
          <line>
            <bufferGeometry>
              <float32BufferAttribute 
                attach="attributes-position" 
                count={64}
                array={new Float32Array(
                  [...Array(65)].map((_, i) => {
                    const angle = (i / 64) * Math.PI * 2
                    return [
                      Math.cos(angle) * planet.orbitRadius,
                      0,
                      Math.sin(angle) * planet.orbitRadius
                    ]
                  }).flat()
                )}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
          </line>

          {/* Planet */}
          <mesh
            position={[planet.orbitRadius, 0, 0]}
            onClick={() => onPlanetSelect(planet)}
          >
            <sphereGeometry args={[planet.radius, 32, 32]} />
            <meshStandardMaterial>
              <textureLoader args={[planet.texture]} attach="map" />
            </meshStandardMaterial>
          </mesh>
        </group>
      ))}
    </group>
  )
}