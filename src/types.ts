
export interface Planet {
  id: string;
  name: string;
  radius: number;
  orbitRadius: number;
  rotationSpeed: number;
  orbitSpeed: number;
  texture: string;
  description: string;
  facts: {
    diameter: string;
    mass: string;
    temperature: string;
    dayLength: string;
    yearLength: string;
  };
}