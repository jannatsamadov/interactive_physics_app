import { useState } from 'react';
import { PhysicsCanvas } from './components/PhysicsCanvas';
import { PhysicsControls } from './components/PhysicsControls';
import { PhysicsInfo } from './components/PhysicsInfo';

export type PhysicsMode = 'gravity' | 'projectile' | 'pendulum' | 'collision';

export default function App() {
  const [mode, setMode] = useState<PhysicsMode>('gravity');
  const [gravity, setGravity] = useState(9.8);
  const [elasticity, setElasticity] = useState(0.8);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="mb-2">Physics Playground</h1>
          <p className="text-blue-200">
            Interactive physics simulations with real-time controls
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,320px] gap-6">
          <div className="space-y-6">
            <PhysicsCanvas
              mode={mode}
              gravity={gravity}
              elasticity={elasticity}
              isPaused={isPaused}
            />
            <PhysicsInfo mode={mode} gravity={gravity} elasticity={elasticity} />
          </div>

          <PhysicsControls
            mode={mode}
            setMode={setMode}
            gravity={gravity}
            setGravity={setGravity}
            elasticity={elasticity}
            setElasticity={setElasticity}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
        </div>
      </div>
    </div>
  );
}
