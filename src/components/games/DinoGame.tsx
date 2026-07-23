import { useEffect, useRef, useState, useCallback } from 'react';

type Status = 'idle' | 'running' | 'over';
type ObType = 'ground' | 'over';

interface Obstacle {
  x: number;
  w: number;
  h: number;
  type: ObType;
}
interface Bean {
  x: number;
  y: number;
  got: boolean;
}
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const W = 600;
const H = 220;
const GROUND_Y = 188;
const GRAVITY = 0.62;
const JUMP_V = -11.6;
const PLAYER_X = 60;
const PLAYER_W = 30;
const STAND_H = 36;
const CROUCH_H = 20;
const STORAGE_KEY = 'dino-best';

const MEDALS = [
  { min: 600, label: 'Espresso-mästare', icon: '🏆' },
  { min: 350, label: 'Koffeinboostad', icon: '⚡' },
  { min: 150, label: 'Pigg', icon: '☕' },
  { min: 0, label: 'Sömnig', icon: '😴' },
];
function medalFor(score: number) {
  return MEDALS.find((m) => score >= m.min) ?? MEDALS[MEDALS.length - 1];
}

function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [, setStatus] = useState<Status>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const s = useRef({
    status: 'idle' as Status,
    y: GROUND_Y - STAND_H,
    vy: 0,
    onGround: true,
    ducking: false,
    obstacles: [] as Obstacle[],
    beans: [] as Bean[],
    particles: [] as Particle[],
    speed: 5,
    distance: 0,
    spawnTimer: 40,
    beanTimer: 90,
    score: 0,
    legPhase: 0,
    newRecord: false,
    flash: 0,
  });

  const reset = useCallback(() => {
    const g = s.current;
    g.y = GROUND_Y - STAND_H;
    g.vy = 0;
    g.onGround = true;
    g.ducking = false;
    g.obstacles = [];
    g.beans = [];
    g.particles = [];
    g.speed = 5;
    g.distance = 0;
    g.spawnTimer = 45;
    g.beanTimer = 90;
    g.score = 0;
    g.newRecord = false;
    g.flash = 0;
    setScore(0);
  }, []);

  const jump = useCallback(() => {
    const g = s.current;
    if (g.status === 'idle' || g.status === 'over') {
      reset();
      g.status = 'running';
      setStatus('running');
      return;
    }
    if (g.onGround) {
      g.vy = JUMP_V;
      g.onGround = false;
    }
  }, [reset]);

  const setDuck = useCallback((v: boolean) => {
    const g = s.current;
    g.ducking = v;
    if (v && !g.onGround) g.vy += 4; // fast-fall
  }, []);

  // keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'ArrowUp' || e.key === ' ') {
        e.preventDefault();
        jump();
      } else if (e.code === 'ArrowDown' || e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setDuck(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown' || e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') setDuck(false);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [jump, setDuck]);

  // main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;

    const spawn = () => {
      const g = s.current;
      const overhead = Math.random() < 0.34;
      if (overhead) {
        g.obstacles.push({ x: W + 10, w: 34, h: 16, type: 'over' });
      } else {
        const tall = Math.random() < 0.35;
        const w = 16 + Math.floor(Math.random() * 16);
        const h = tall ? 42 + Math.floor(Math.random() * 16) : 24 + Math.floor(Math.random() * 12);
        g.obstacles.push({ x: W + 10, w, h, type: 'ground' });
      }
      g.spawnTimer = Math.max(48, 96 - g.speed * 3) + Math.floor(Math.random() * 45);
    };

    const spawnBean = () => {
      const g = s.current;
      const y = GROUND_Y - (30 + Math.floor(Math.random() * 70));
      g.beans.push({ x: W + 10, y, got: false });
      g.beanTimer = 110 + Math.floor(Math.random() * 120);
    };

    const burst = (x: number, y: number, color: string, n = 8) => {
      const g = s.current;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 3;
        g.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1, life: 30, color });
      }
    };

    const playerRect = () => {
      const g = s.current;
      const h = g.ducking && g.onGround ? CROUCH_H : STAND_H;
      const w = g.ducking && g.onGround ? PLAYER_W + 8 : PLAYER_W;
      const top = g.ducking && g.onGround ? GROUND_Y - CROUCH_H : g.y;
      return { x: PLAYER_X, y: top, w, h };
    };

    const draw = () => {
      const g = s.current;
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      const bg = dark ? '#26201c' : '#fbf5ec';
      const ink = dark ? '#f4ede5' : '#241d18';
      const border = dark ? '#3b332d' : '#241d18';
      const accent = '#e07a4f';
      const accent2 = '#e6b84c';

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ground
      ctx.strokeStyle = border;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(W, GROUND_Y);
      ctx.stroke();
      ctx.fillStyle = dark ? '#3b332d' : '#c2b4a2';
      for (let i = 0; i < 6; i++) {
        const gx = W - ((g.distance * 0.5 + i * 110) % (W + 40));
        ctx.fillRect(gx, GROUND_Y + 8, 14, 3);
      }

      // beans
      g.beans.forEach((b) => {
        if (b.got) return;
        ctx.fillStyle = accent2;
        ctx.strokeStyle = border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(b.x, b.y, 7, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(b.x, b.y - 6);
        ctx.lineTo(b.x, b.y + 6);
        ctx.stroke();
      });

      // player (coffee cup)
      const pr = playerRect();
      ctx.fillStyle = accent;
      ctx.strokeStyle = border;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pr.x, pr.y, pr.w, pr.h - 6, 5);
      ctx.fill();
      ctx.stroke();
      // handle
      ctx.beginPath();
      ctx.arc(pr.x + pr.w + 2, pr.y + pr.h / 2 - 3, 6, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();
      // eyes
      ctx.fillStyle = '#fff';
      const ey = pr.y + (g.ducking && g.onGround ? 7 : 12);
      ctx.beginPath();
      ctx.arc(pr.x + 10, ey, 3, 0, Math.PI * 2);
      ctx.arc(pr.x + 20, ey, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(pr.x + 11, ey, 1.4, 0, Math.PI * 2);
      ctx.arc(pr.x + 21, ey, 1.4, 0, Math.PI * 2);
      ctx.fill();
      // legs
      if (g.onGround && g.status === 'running') {
        ctx.strokeStyle = border;
        ctx.lineWidth = 3;
        const sw = Math.sin(g.legPhase) * 5;
        ctx.beginPath();
        ctx.moveTo(pr.x + 8, pr.y + pr.h - 6);
        ctx.lineTo(pr.x + 8 + sw, pr.y + pr.h + 2);
        ctx.moveTo(pr.x + pr.w - 10, pr.y + pr.h - 6);
        ctx.lineTo(pr.x + pr.w - 10 - sw, pr.y + pr.h + 2);
        ctx.stroke();
      }

      // obstacles
      g.obstacles.forEach((o) => {
        if (o.type === 'ground') {
          const oy = GROUND_Y - o.h;
          const colors = ['#ef5a6f', '#e6b84c', '#3fb562', '#7b3fe4'];
          let drawn = 0;
          let idx = 0;
          while (drawn < o.h) {
            const bandH = Math.min(10 + (idx % 3) * 2, o.h - drawn);
            ctx.fillStyle = colors[idx % colors.length];
            ctx.fillRect(o.x, oy + drawn, o.w, bandH - 2);
            drawn += bandH;
            idx++;
          }
          ctx.strokeStyle = border;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(o.x, oy, o.w, o.h);
        } else {
          // overhead: a flying "deadline" paper plane
          const oy = GROUND_Y - STAND_H - 4;
          ctx.fillStyle = accent2;
          ctx.strokeStyle = border;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(o.x, oy);
          ctx.lineTo(o.x + o.w, oy + o.h / 2);
          ctx.lineTo(o.x, oy + o.h);
          ctx.lineTo(o.x + o.w * 0.35, oy + o.h / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      });

      // particles
      g.particles.forEach((p) => {
        ctx.globalAlpha = Math.max(0, p.life / 30);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
        ctx.globalAlpha = 1;
      });

      // HUD
      ctx.fillStyle = ink;
      ctx.font = "bold 18px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.floor(g.score)}`, W - 12, 28);
      ctx.textAlign = 'left';
      ctx.fillStyle = dark ? '#b4a89d' : '#6b5f54';
      ctx.font = "12px 'Space Mono', monospace";
      ctx.fillText(`REKORD ${best}`, 12, 26);

      if (g.status === 'idle') {
        ctx.fillStyle = ink;
        ctx.textAlign = 'center';
        ctx.font = "bold 20px 'Space Grotesk', system-ui, sans-serif";
        ctx.fillText('Tryck på mellanslag / klick för att starta', W / 2, H / 2 - 4);
        ctx.font = "13px 'Space Mono', monospace";
        ctx.fillStyle = dark ? '#b4a89d' : '#6b5f54';
        ctx.fillText('↑ hoppa   ↓ ducka', W / 2, H / 2 + 22);
        ctx.textAlign = 'left';
      }

      if (g.status === 'over') {
        ctx.fillStyle = dark ? 'rgba(26,22,19,0.82)' : 'rgba(242,235,224,0.86)';
        ctx.fillRect(0, 0, W, H);
        // panel
        const pw = 360;
        const ph = 150;
        const px = (W - pw) / 2;
        const py = (H - ph) / 2;
        ctx.fillStyle = dark ? '#211b17' : '#fff';
        ctx.strokeStyle = border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(px, py, pw, ph, 12);
        ctx.fill();
        ctx.stroke();

        const medal = medalFor(Math.floor(g.score));
        ctx.textAlign = 'center';
        ctx.fillStyle = ink;
        ctx.font = "bold 26px 'Space Grotesk', system-ui, sans-serif";
        ctx.fillText('GAME OVER', W / 2, py + 34);
        ctx.font = "20px 'Space Grotesk', system-ui, sans-serif";
        ctx.fillText(`${medal.icon} ${medal.label}`, W / 2, py + 64);
        ctx.font = "14px 'Space Mono', monospace";
        ctx.fillStyle = dark ? '#b4a89d' : '#6b5f54';
        ctx.fillText(`Poäng ${Math.floor(g.score)}   ·   Rekord ${best}`, W / 2, py + 90);

        if (g.newRecord) {
          const blink = Math.floor(Date.now() / 350) % 2 === 0;
          if (blink) {
            ctx.fillStyle = accent;
            ctx.font = "bold 16px 'Space Mono', monospace";
            ctx.fillText('★ NYTT REKORD! ★', W / 2, py + 114);
          }
        } else {
          ctx.fillStyle = accent;
          ctx.font = "13px 'Space Mono', monospace";
          ctx.fillText('Tryck för att spela igen →', W / 2, py + 114);
        }
        ctx.font = "12px 'Space Mono', monospace";
        ctx.fillStyle = dark ? '#b4a89d' : '#6b5f54';
        ctx.fillText('mellanslag / klick', W / 2, py + 136);
        ctx.textAlign = 'left';
      }
    };

    const tick = () => {
      const g = s.current;
      if (g.status === 'running') {
        g.vy += GRAVITY;
        g.y += g.vy;
        const standTop = GROUND_Y - STAND_H;
        if (g.y >= standTop) {
          g.y = standTop;
          g.vy = 0;
          g.onGround = true;
        }
        g.legPhase += 0.3;
        g.distance += g.speed;
        g.score += g.speed * 0.02;
        g.speed = 5 + Math.min(7, g.score / 120);

        g.spawnTimer -= 1;
        if (g.spawnTimer <= 0) spawn();
        g.beanTimer -= 1;
        if (g.beanTimer <= 0) spawnBean();

        g.obstacles.forEach((o) => (o.x -= g.speed));
        g.obstacles = g.obstacles.filter((o) => o.x + o.w > -12);
        g.beans.forEach((b) => (b.x -= g.speed));
        g.beans = g.beans.filter((b) => b.x > -12 && !b.got);

        g.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15;
          p.life -= 1;
        });
        g.particles = g.particles.filter((p) => p.life > 0);

        // player rect
        const h = g.ducking && g.onGround ? CROUCH_H : STAND_H;
        const top = g.ducking && g.onGround ? GROUND_Y - CROUCH_H : g.y;
        const pad = 4;
        const px = PLAYER_X + pad;
        const pw = (g.ducking && g.onGround ? PLAYER_W + 8 : PLAYER_W) - pad * 2;
        const ptop = top + pad;
        const pbot = top + h;

        // beans collect
        g.beans.forEach((b) => {
          if (!b.got && b.x > px - 12 && b.x < px + pw + 12 && b.y > ptop - 12 && b.y < pbot + 12) {
            b.got = true;
            g.score += 15;
            g.flash = 8;
            burst(b.x, b.y, '#e6b84c', 10);
          }
        });

        // collisions
        for (const o of g.obstacles) {
          if (o.type === 'ground') {
            const oy = GROUND_Y - o.h;
            if (px < o.x + o.w && px + pw > o.x && pbot > oy) {
              g.status = 'over';
              endGame();
              break;
            }
          } else {
            const oy = GROUND_Y - STAND_H - 4;
            const obot = oy + o.h;
            // only hits if NOT ducking (standing head enters the band)
            if (px < o.x + o.w && px + pw > o.x && ptop < obot && pbot > oy) {
              g.status = 'over';
              endGame();
              break;
            }
          }
        }
        if (g.status === 'running') setScore(Math.floor(g.score));
        if (g.flash > 0) g.flash -= 1;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const endGame = () => {
      const g = s.current;
      setStatus('over');
      const finalScore = Math.floor(g.score);
      setScore(finalScore);
      setBest((b) => {
        if (finalScore > b) {
          g.newRecord = true;
          localStorage.setItem(STORAGE_KEY, String(finalScore));
          return finalScore;
        }
        return b;
      });
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [best]);

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="relative rounded-xl overflow-hidden select-none"
        style={{ border: '2px solid var(--border)', boxShadow: '4px 4px 0 var(--shadow)' }}
        onMouseDown={jump}
        onTouchStart={(e) => {
          e.preventDefault();
          jump();
        }}
        role="button"
        tabIndex={0}
        aria-label="Kaffehopp spelyta – klicka eller mellanslag för att hoppa"
      >
        <canvas ref={canvasRef} width={W} height={H} className="w-full h-auto block" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="pp-mono text-sm" style={{ color: 'var(--ink-muted)' }}>
          POÄNG <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{score}</span>
          <span className="mx-2">·</span>
          REKORD <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{best}</span>
        </div>
      </div>

      {/* Touch controls */}
      <div className="grid grid-cols-2 gap-3 mt-4 sm:hidden">
        <button
          onMouseDown={jump}
          onTouchStart={(e) => { e.preventDefault(); jump(); }}
          className="py-4 rounded-xl font-bold text-white"
          style={{ background: '#e07a4f', border: '2px solid var(--border)', boxShadow: '3px 3px 0 var(--shadow)' }}
        >
          ↑ Hoppa
        </button>
        <button
          onTouchStart={(e) => { e.preventDefault(); setDuck(true); }}
          onTouchEnd={() => setDuck(false)}
          onMouseDown={() => setDuck(true)}
          onMouseUp={() => setDuck(false)}
          className="py-4 rounded-xl font-bold"
          style={{ background: 'var(--surface2)', color: 'var(--ink)', border: '2px solid var(--border)', boxShadow: '3px 3px 0 var(--shadow)' }}
        >
          ↓ Ducka
        </button>
      </div>

      <p className="mt-3 text-center pp-mono text-sm" style={{ color: 'var(--ink-muted)' }}>
        ↑ / mellanslag = hoppa över bokhögar · ↓ = ducka för pappersplanen · samla kaffebönor för bonus!
      </p>
    </div>
  );
}

export default DinoGame;
