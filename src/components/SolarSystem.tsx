
import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { planets } from '../data/planets'
import { Planet as PlanetType } from '../types'
import * as THREE from 'three'

interface SolarSystemProps {
  onPlanetSelect: (planet: PlanetType) => void
}

export function SolarSystem({ onPlanetSelect }: SolarSystemProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Pre-load all textures
  const textures = planets.map(planet => 
    useLoader(THREE.TextureLoader, planet.texture)
  )

  // Create orbit points
  const orbitPoints = (radius: number) => {
    const points = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      points.push(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      )
    }
    return new Float32Array(points)
  }

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    
    planets.forEach((planet, index) => {
      const planetGroup = groupRef.current?.children[index + 1] as THREE.Group
      if (planetGroup) {
        // Update planet position in orbit
        const angle = elapsedTime * planet.orbitSpeed
        planetGroup.position.x = Math.cos(angle) * planet.orbitRadius
        planetGroup.position.z = Math.sin(angle) * planet.orbitRadius
        
        // Rotate planet (first child of group is the planet mesh)
        const planetMesh = planetGroup.children[0]
        if (planetMesh) {
          planetMesh.rotation.y += planet.rotationSpeed
        }
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ffd700" />
        <pointLight intensity={2} distance={100} decay={2} />
      </mesh>

      {/* Planets */}
      {planets.map((planet, index) => (
        <group key={planet.id} position={[planet.orbitRadius, 0, 0]}>
          {/* Planet */}
          <mesh
            onClick={(e) => {
              e.stopPropagation()
              onPlanetSelect(planet)
            }}
          >
            <sphereGeometry args={[planet.radius, 32, 32]} />
            <meshStandardMaterial
              map={textures[index]}
              metalness={0.4}
              roughness={0.7}
            />
          </mesh>

          {/* Orbit line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={65}
                array={orbitPoints(planet.orbitRadius)}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
          </line>
        </group>
      ))}
    </group>
  )
}