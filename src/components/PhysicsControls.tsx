import { Play, Pause, RotateCcw } from 'lucide-react';
import { PhysicsMode } from '../App';

interface PhysicsControlsProps {
  mode: PhysicsMode;
  setMode: (mode: PhysicsMode) => void;
  gravity: number;
  setGravity: (gravity: number) => void;
  elasticity: number;
  setElasticity: (elasticity: number) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
}

export function PhysicsControls({
  mode,
  setMode,
  gravity,
  setGravity,
  elasticity,
  setElasticity,
  isPaused,
  setIsPaused,
}: PhysicsControlsProps) {
  const modes: { id: PhysicsMode; label: string; description: string }[] = [
    { id: 'gravity', label: 'Gravity', description: 'Falling objects with bounce' },
    { id: 'projectile', label: 'Projectile', description: 'Click to launch objects' },
    { id: 'pendulum', label: 'Pendulum', description: 'Simple harmonic motion' },
    { id: 'collision', label: 'Collision', description: 'Elastic collision demo' },
  ];

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 backdrop-blur-sm space-y-6">
      <div>
        <h2 className="mb-4">Simulation Mode</h2>
        <div className="space-y-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                mode === m.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <div>{m.label}</div>
              <div className="text-sm opacity-80">{m.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3>Physics Parameters</h3>

        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Gravity: {gravity.toFixed(1)} m/s²
          </label>
          <input
            type="range"
            min="0"
            max="20"
            step="0.1"
            value={gravity}
            onChange={(e) => setGravity(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {mode !== 'pendulum' && (
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Elasticity: {elasticity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={elasticity}
              onChange={(e) => setElasticity(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {mode === 'projectile' && (
        <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
          <p className="text-sm text-blue-200">
            💡 Click anywhere on the canvas to launch a projectile!
          </p>
        </div>
      )}
    </div>
  );
}
