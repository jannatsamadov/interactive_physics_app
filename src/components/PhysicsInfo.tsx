import { PhysicsMode } from '../App';

interface PhysicsInfoProps {
  mode: PhysicsMode;
  gravity: number;
  elasticity: number;
}

export function PhysicsInfo({ mode, gravity, elasticity }: PhysicsInfoProps) {
  const info = {
    gravity: {
      title: 'Free Fall with Gravity',
      description: 'Objects fall under the influence of gravity and bounce when they hit the ground. The elasticity coefficient determines how much energy is retained after each bounce.',
      formulas: [
        'v = v₀ + gt',
        'y = y₀ + v₀t + ½gt²',
        'v_after = -e × v_before',
      ],
    },
    projectile: {
      title: 'Projectile Motion',
      description: 'Objects follow a parabolic trajectory when launched at an angle. The horizontal and vertical motions are independent, with gravity only affecting the vertical component.',
      formulas: [
        'x = x₀ + v₀ₓt',
        'y = y₀ + v₀ᵧt - ½gt²',
        'Range = (v₀² sin(2θ)) / g',
      ],
    },
    pendulum: {
      title: 'Simple Pendulum',
      description: 'A mass suspended from a fixed point exhibits periodic motion. For small angles, the motion is approximately simple harmonic motion with a period independent of amplitude.',
      formulas: [
        'α = -(g/L) sin(θ)',
        'T = 2π√(L/g)',
        'E = ½mL²ω² + mgL(1 - cos(θ))',
      ],
    },
    collision: {
      title: 'Elastic Collision',
      description: 'When two objects collide, momentum and energy are conserved in an elastic collision. The objects exchange velocities based on their masses and initial velocities.',
      formulas: [
        'p_total = p₁ + p₂ (conserved)',
        'KE_total = ½m₁v₁² + ½m₂v₂²',
        'v₁′ = ((m₁-m₂)v₁ + 2m₂v₂)/(m₁+m₂)',
      ],
    },
  };

  const currentInfo = info[mode];

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 backdrop-blur-sm">
      <h2 className="mb-3">{currentInfo.title}</h2>
      <p className="text-slate-300 mb-4">{currentInfo.description}</p>
      
      <div className="space-y-2">
        <h3 className="text-sm text-slate-400">Key Equations:</h3>
        <div className="flex flex-wrap gap-3">
          {currentInfo.formulas.map((formula, index) => (
            <code
              key={index}
              className="bg-slate-900/70 px-3 py-2 rounded text-sm text-blue-300 border border-slate-700"
            >
              {formula}
            </code>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Current Gravity:</span>
            <div className="text-white">
              {gravity.toFixed(1)} m/s²
            </div>
          </div>
          {mode !== 'pendulum' && (
            <div>
              <span className="text-slate-400">Elasticity:</span>
              <div className="text-white">
                {elasticity.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
