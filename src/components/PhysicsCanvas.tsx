import { useEffect, useRef } from 'react';
import { PhysicsMode } from '../App';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Pendulum {
  angle: number;
  angularVelocity: number;
  length: number;
}

interface PhysicsCanvasProps {
  mode: PhysicsMode;
  gravity: number;
  elasticity: number;
  isPaused: boolean;
}

export function PhysicsCanvas({ mode, gravity, elasticity, isPaused }: PhysicsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const pendulumRef = useRef<Pendulum>({ angle: Math.PI / 4, angularVelocity: 0, length: 200 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize balls for different modes
    const initializeBalls = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      if (mode === 'gravity') {
        ballsRef.current = [
          { x: width * 0.2, y: 50, vx: 0, vy: 0, radius: 20, color: '#60a5fa' },
          { x: width * 0.4, y: 100, vx: 0, vy: 0, radius: 25, color: '#34d399' },
          { x: width * 0.6, y: 80, vx: 0, vy: 0, radius: 15, color: '#f472b6' },
          { x: width * 0.8, y: 120, vx: 0, vy: 0, radius: 30, color: '#fbbf24' },
        ];
      } else if (mode === 'projectile') {
        ballsRef.current = [];
      } else if (mode === 'collision') {
        ballsRef.current = [
          { x: width * 0.3, y: height / 2, vx: 150, vy: 0, radius: 25, color: '#60a5fa' },
          { x: width * 0.7, y: height / 2, vx: -150, vy: 0, radius: 25, color: '#f472b6' },
        ];
      }
    };

    initializeBalls();

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const dt = 1 / 60;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      if (!isPaused) {
        if (mode === 'pendulum') {
          // Pendulum physics
          const pendulum = pendulumRef.current;
          const g = gravity * 10;
          const angularAcceleration = (-g / pendulum.length) * Math.sin(pendulum.angle);
          pendulum.angularVelocity += angularAcceleration * dt;
          pendulum.angle += pendulum.angularVelocity * dt;
          pendulum.angularVelocity *= 0.999; // Damping
        } else {
          // Ball physics
          ballsRef.current.forEach((ball, i) => {
            // Apply gravity
            ball.vy += gravity * 10 * dt;

            // Update position
            ball.x += ball.vx * dt;
            ball.y += ball.vy * dt;

            // Bounce off walls
            if (ball.x - ball.radius < 0) {
              ball.x = ball.radius;
              ball.vx *= -elasticity;
            }
            if (ball.x + ball.radius > width) {
              ball.x = width - ball.radius;
              ball.vx *= -elasticity;
            }
            if (ball.y + ball.radius > height) {
              ball.y = height - ball.radius;
              ball.vy *= -elasticity;
              ball.vx *= 0.98; // Friction
            }
            if (ball.y - ball.radius < 0) {
              ball.y = ball.radius;
              ball.vy *= -elasticity;
            }

            // Ball to ball collisions
            if (mode === 'collision') {
              ballsRef.current.forEach((otherBall, j) => {
                if (i !== j) {
                  const dx = otherBall.x - ball.x;
                  const dy = otherBall.y - ball.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  const minDistance = ball.radius + otherBall.radius;

                  if (distance < minDistance) {
                    // Simple elastic collision
                    const angle = Math.atan2(dy, dx);
                    const targetX = ball.x + Math.cos(angle) * minDistance;
                    const targetY = ball.y + Math.sin(angle) * minDistance;
                    const ax = (targetX - otherBall.x) * 0.5;
                    const ay = (targetY - otherBall.y) * 0.5;

                    ball.vx -= ax;
                    ball.vy -= ay;
                    otherBall.vx += ax;
                    otherBall.vy += ay;

                    // Separate balls
                    otherBall.x += ax;
                    otherBall.y += ay;
                    ball.x -= ax;
                    ball.y -= ay;
                  }
                }
              });
            }
          });
        }
      }

      // Draw
      if (mode === 'pendulum') {
        const pendulum = pendulumRef.current;
        const pivotX = width / 2;
        const pivotY = 100;
        const bobX = pivotX + Math.sin(pendulum.angle) * pendulum.length;
        const bobY = pivotY + Math.cos(pendulum.angle) * pendulum.length;

        // Draw rod
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();

        // Draw pivot
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw bob
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(bobX, bobY, 25, 0, Math.PI * 2);
        ctx.fill();

        // Draw velocity vector
        const velocityScale = 0.5;
        const vx = pendulum.angularVelocity * Math.cos(pendulum.angle) * pendulum.length * velocityScale;
        const vy = -pendulum.angularVelocity * Math.sin(pendulum.angle) * pendulum.length * velocityScale;
        
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(bobX + vx, bobY + vy);
        ctx.stroke();

        // Draw arrowhead
        const arrowSize = 8;
        const angle = Math.atan2(vy, vx);
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(bobX + vx, bobY + vy);
        ctx.lineTo(
          bobX + vx - arrowSize * Math.cos(angle - Math.PI / 6),
          bobY + vy - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          bobX + vx - arrowSize * Math.cos(angle + Math.PI / 6),
          bobY + vy - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      } else {
        // Draw balls
        ballsRef.current.forEach((ball) => {
          ctx.fillStyle = ball.color;
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          ctx.fill();

          // Draw velocity vector
          const velocityScale = 0.1;
          const endX = ball.x + ball.vx * velocityScale;
          const endY = ball.y + ball.vy * velocityScale;

          ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ball.x, ball.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        });
      }

      // Draw ground line
      if (mode !== 'pendulum') {
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height - 1);
        ctx.lineTo(width, height - 1);
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle clicks for projectile mode
    const handleClick = (e: MouseEvent) => {
      if (mode !== 'projectile') return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const colors = ['#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#a78bfa'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      ballsRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 300,
        vy: -Math.random() * 300 - 100,
        radius: 15 + Math.random() * 15,
        color,
      });
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
    };
  }, [mode, gravity, elasticity, isPaused]);

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden backdrop-blur-sm">
      <canvas
        ref={canvasRef}
        className="w-full h-[500px] cursor-pointer"
        style={{ display: 'block' }}
      />
    </div>
  );
}
