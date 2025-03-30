
import { Planet } from '../types'

export const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    radius: 0.5,
    orbitRadius: 5,
    rotationSpeed: 0.005,
    orbitSpeed: 0.02,
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mercury.jpg',
    description: 'Mercury is the smallest and innermost planet in the Solar System.',
    facts: {
      diameter: '4,879 km',
      mass: '3.285 × 10^23 kg',
      temperature: '-180°C to 430°C',
      dayLength: '176 Earth days',
      yearLength: '88 Earth days',
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 0.9,
    orbitRadius: 8,
    rotationSpeed: 0.004,
    orbitSpeed: 0.015,
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/venus.jpg',
    description: 'Venus is the second planet from the Sun and the hottest planet in our solar system.',
    facts: {
      diameter: '12,104 km',
      mass: '4.867 × 10^24 kg',
      temperature: '462°C',
      dayLength: '243 Earth days',
      yearLength: '225 Earth days',
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    radius: 1,
    orbitRadius: 11,
    rotationSpeed: 0.005,
    orbitSpeed: 0.01,
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth.jpg',
    description: 'Earth is our home planet and the only known planet to harbor life.',
    facts: {
      diameter: '12,742 km',
      mass: '5.972 × 10^24 kg',
      temperature: '15°C (average)',
      dayLength: '24 hours',
      yearLength: '365.25 days',
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    radius: 0.7,
    orbitRadius: 14,
    rotationSpeed: 0.004,
    orbitSpeed: 0.008,
    texture: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mars.jpg',
    description: 'Mars is often called the Red Planet due to its reddish appearance.',
    facts: {
      diameter: '6,779 km',
      mass: '6.39 × 10^23 kg',
      temperature: '-63°C (average)',
      dayLength: '24 hours 37 minutes',
      yearLength: '687 Earth days',
    }
  },
]