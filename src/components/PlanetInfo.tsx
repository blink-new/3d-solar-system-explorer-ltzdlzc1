
import { Planet } from '../types'

interface PlanetInfoProps {
  planet: Planet
  onClose: () => void
}

export function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  return (
    <div className="absolute bottom-0 right-0 m-4 p-6 bg-black/80 text-white rounded-lg w-80 backdrop-blur-lg border border-white/20">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-white/60 hover:text-white"
      >
        ✕
      </button>
      
      <h2 className="text-2xl font-bold mb-4">{planet.name}</h2>
      <p className="text-gray-300 mb-4">{planet.description}</p>
      
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <span className="text-gray-400">Diameter:</span>
          <span>{planet.facts.diameter}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-gray-400">Mass:</span>
          <span>{planet.facts.mass}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-gray-400">Temperature:</span>
          <span>{planet.facts.temperature}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-gray-400">Day Length:</span>
          <span>{planet.facts.dayLength}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-gray-400">Year Length:</span>
          <span>{planet.facts.yearLength}</span>
        </div>
      </div>
    </div>
  )
}