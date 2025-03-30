
import { useRef, useMemo, useCallback } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { planets } from '../data/planets'
import { Planet as PlanetType } from '../types'
import * as THREE from 'three'

interface SolarSystemProps {
  onPlanetSelect: (planet: PlanetType) => void
}

export function SolarSystem({ onPlanetSelect }: SolarSystemProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Pre-load and memoize all textures
  const textures = useMemo(() => 
    planets.map(planet => 
      useLoader(THREE.TextureLoader, planet.texture)
    ),
    [] // Empty deps since planet textures don't change
  )

  // Memoize materials to prevent unnecessary recreations
  const materials = useMemo(() => 
    textures.map(texture => 
      new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.4,
        roughness: 0.7,
      })
    ),
    [textures]
  )

  // Memoize geometries
  const planetGeometries = useMemo(() => 
    planets.map(planet => 
      new THREE.SphereGeometry(planet.radius, 32, 32)
    ),
    [] // Empty deps since planet radii don't change
  )

  // Create and memoize orbit points
  const orbitGeometries = useMemo(() => 
    planets.map(planet => {
      const points = []
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2
        points.push(
          Math.cos(angle) * planet.orbitRadius,
          0,
          Math.sin(angle) * planet.orbitRadius
        )
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
      return geometry
    }),
    [] // Empty deps since orbit radii don't change
  )

  // Memoize orbit material
  const orbitMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({
      color: '#ffffff',
      opacity: 0.2,
      transparent: true,
    }),
    []
  )

  // Memoize sun geometry and material
  const sunGeometry = useMemo(() => 
    new THREE.SphereGeometry(2, 32, 32),
    []
  )

  const sunMaterial = useMemo(() => 
    new THREE.MeshBasicMaterial({ color: '#ffd700' }),
    []
  )

  // Optimize planet click handler
  const handlePlanetClick = useCallback((e: THREE.Event, planet: PlanetType) => {
    e.stopPropagation()
    onPlanetSelect(planet)
  }, [onPlanetSelect])

  // Optimize animation frame updates
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    
    planets.forEach((planet, index) => {
      const planetGroup = groupRef.current?.children[index + 1] as THREE.Group
      if (planetGroup) {
        // Calculate position only once
        const angle = elapsedTime * planet.orbitSpeed
        const x = Math.cos(angle) * planet.orbitRadius
        const z = Math.sin(angle) * planet.orbitRadius
        
        // Update position directly instead of using .set()
        planetGroup.position.x = x
        planetGroup.position.z = z
        
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
      <mesh geometry={sunGeometry} material={sunMaterial}>
        <pointLight intensity={2} distance={100} decay={2} />
      </mesh>

      {/* Planets */}
      {planets.map((planet, index) => (
        <group key={planet.id} position={[planet.orbitRadius, 0, 0]}>
          {/* Planet */}
          <mesh
            geometry={planetGeometries[index]}
            material={materials[index]}
            onClick={(e) => handlePlanetClick(e, planet)}
          />

          {/* Orbit line */}
          <line geometry={orbitGeometries[index]} material={orbitMaterial} />
        </group>
      ))}
    </group>
  )
}