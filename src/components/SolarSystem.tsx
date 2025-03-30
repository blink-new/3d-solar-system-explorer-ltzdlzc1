
import { useRef, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { planets } from '../data/planets'
import { Planet as PlanetType } from '../types'
import * as THREE from 'three'

interface SolarSystemProps {
  onPlanetSelect: (planet: PlanetType) => void
}

export function SolarSystem({ onPlanetSelect }: SolarSystemProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Memoize materials with improved visibility
  const materials = useMemo(() => 
    planets.map(planet => 
      new THREE.MeshStandardMaterial({
        color: planet.color,
        metalness: 0.1,
        roughness: 0.8,
        emissive: planet.color,
        emissiveIntensity: 0.2,
      })
    ),
    []
  )

  // Memoize geometries
  const planetGeometries = useMemo(() => 
    planets.map(planet => 
      new THREE.SphereGeometry(planet.radius, 32, 32)
    ),
    []
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
    []
  )

  // Memoize orbit material with improved visibility
  const orbitMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({
      color: '#ffffff',
      opacity: 0.3,
      transparent: true,
    }),
    []
  )

  // Memoize sun geometry and material with stronger emission
  const sunGeometry = useMemo(() => 
    new THREE.SphereGeometry(2, 32, 32),
    []
  )

  const sunMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({ 
      color: '#FDB813',
      emissive: '#FDB813',
      emissiveIntensity: 1,
      metalness: 0,
      roughness: 0.7,
    }),
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
        const angle = elapsedTime * planet.orbitSpeed
        const x = Math.cos(angle) * planet.orbitRadius
        const z = Math.sin(angle) * planet.orbitRadius
        
        planetGroup.position.x = x
        planetGroup.position.z = z
        
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
        <pointLight intensity={1.5} distance={100} decay={2} color="#ffffff" />
      </mesh>

      {/* Planets */}
      {planets.map((planet, index) => (
        <group key={planet.id} position={[planet.orbitRadius, 0, 0]}>
          <mesh
            geometry={planetGeometries[index]}
            material={materials[index]}
            onClick={(e) => handlePlanetClick(e, planet)}
            castShadow
            receiveShadow
          />
          <line geometry={orbitGeometries[index]} material={orbitMaterial} />
        </group>
      ))}
    </group>
  )
}