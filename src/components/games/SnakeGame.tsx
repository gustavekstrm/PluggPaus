import { useEffect, useRef, useState, useCallback } from 'react';

type Status = 'idle' | 'running' | 'over';
type Dir = 'up' | 'down' | 'left' | 'right';
interface Cell {
  x: number;
  y: number;
}

const COLS = 20;
const ROWS = 15;
const CELL = 26;
const W = COLS * CELL;
const H = ROWS * CELL;
const STORAGE_KEY = 'snake-best';

const MEDALS = [
  { min: 30, label: 'Ormprofessor', icon: '🏆' },
  { min: 18, label: 'Snabbtänkt', icon: '⚡' },
  { min: 8, label: 'Flitig', icon: '📚' },
  { min: 0, label: 'Nybörjare', icon: '🐛' },
];
function medalFor(score: number) {
  return MEDALS.find((m) => score >= m.min) ?? MEDALS[MEDALS.length - 1];
}

function stepMs(score: number) {
  return Math.max(75, 125 - score * 2);
}

function randCell(occupied: Cell[]): Cell {
  let c: Cell;
  do {
    c = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (occupied.some((o) => o.x === c.x && o.y === c.y));
  return c;
}

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const s = useRef({
    status: 'idle' as Status,
    snake: [{ x: 8, y: 7 }] as Cell[],
    dir: 'right' as Dir,
    nextDir: 'right' as Dir,
    food: { x: 14, y: 7 } as Cell,
    bonus: null as (Cell & { ttl: number }) | null,
    bonusTimer: 140,
    score: 0,
    acc: 0,
    last: 0,
    newRecord: false,
  });

  const start = useCallback(() => {
    const g = s.current;
    g.snake = [
      { x: 8, y: 7 },
      { x: 7, y: 7 },
      { x: 6, y: 7 },
    ];
    g.dir = 'right';
    g.nextDir = 'right';
    g.food = randCell(g.snake);
    g.bonus = null;
    g.bonusTimer = 140;
    g.score = 0;
    g.acc = 0;
    g.newRecord = false;
    g.status = 'running';
    setScore(0);
    setStatus('running');
  }, []);

  const setDirection = useCallback((d: Dir) => {
    const g = s.current;
    if (g.status !== 'running') return;
    const opp: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
    if (d === opp[g.dir]) return;
    g.nextDir = d;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        if (s.current.status !== 'running') start();
        setDirection(dir);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setDirection, start]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;

    const endGame = () => {
      const g = s.current;
      g.status = 'over';
      setStatus('over');
      setBest((b) => {
        if (g.score > b) {
          g.newRecord = true;
          localStorage.setItem(STORAGE_KEY, String(g.score));
          return g.score;
        }
        return b;
      });
    };

    const step = () => {
      const g = s.current;
      g.dir = g.nextDir;
      const head = { ...g.snake[0] };
      if (g.dir === 'up') head.y -= 1;
      if (g.dir === 'down') head.y += 1;
      if (g.dir === 'left') head.x -= 1;
      if (g.dir === 'right') head.x += 1;

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
        g.snake.some((c) => c.x === head.x && c.y === head.y)) {
        endGame();
        return;
      }

      g.snake.unshift(head);
      let grew = false;
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score += 1;
        setScore(g.score);
        g.food = randCell([...g.snake, ...(g.bonus ? [g.bonus] : [])]);
        grew = true;
      }
      if (g.bonus && head.x === g.bonus.x && head.y === g.bonus.y) {
        g.score += 3;
        setScore(g.score);
        g.bonus = null;
        grew = true;
      }
      if (!grew) g.snake.pop();

      // bonus lifecycle
      g.bonusTimer -= 1;
      if (!g.bonus && g.bonusTimer <= 0) {
        g.bonus = { ...randCell([...g.snake, g.food]), ttl: 45 };
        g.bonusTimer = 220;
      }
      if (g.bonus) {
        g.bonus.ttl -= 1;
        if (g.bonus.ttl <= 0) g.bonus = null;
      }
    };

    const draw = () => {
      const g = s.current;
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      const bg = dark ? '#211b17' : '#fbf5ec';
      const grid = dark ? '#26201c' : '#efe6d8';
      const ink = dark ? '#f4ede5' : '#241d18';
      const border = dark ? '#3b332d' : '#241d18';
      const accent = '#e07a4f';
      const accent2 = '#e6b84c';

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = grid;
      for (let x = 0; x < COLS; x++)
        for (let y = 0; y < ROWS; y++)
          if ((x + y) % 2 === 0) ctx.fillRect(x * CELL, y * CELL, CELL, CELL);

      // food = coffee bean
      const fx = g.food.x * CELL + CELL / 2;
      const fy = g.food.y * CELL + CELL / 2;
      ctx.fillStyle = accent2;
      ctx.strokeStyle = border;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(fx, fy, CELL / 2 - 4, CELL / 2 - 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fx, fy - (CELL / 2 - 4));
      ctx.lineTo(fx, fy + (CELL / 2 - 4));
      ctx.stroke();

      // bonus = golden book (blinks near end)
      if (g.bonus && (g.bonus.ttl > 12 || Math.floor(Date.now() / 150) % 2 === 0)) {
        const bx = g.bonus.x * CELL;
        const by = g.bonus.y * CELL;
        ctx.fillStyle = accent;
        ctx.strokeStyle = border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(bx + 3, by + 4, CELL - 6, CELL - 8, 3);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx + CELL / 2, by + 5);
        ctx.lineTo(bx + CELL / 2, by + CELL - 5);
        ctx.stroke();
      }

      // snake
      g.snake.forEach((c, i) => {
        const t = i / Math.max(1, g.snake.length);
        ctx.fillStyle = i === 0 ? accent : `rgba(224,122,79,${1 - t * 0.55})`;
        const pad = i === 0 ? 2 : 3;
        ctx.beginPath();
        ctx.roundRect(c.x * CELL + pad, c.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 6);
        ctx.fill();
        if (i === 0) {
          ctx.fillStyle = '#fff';
          const ox = g.dir === 'left' ? -3 : g.dir === 'right' ? 3 : 0;
          const oy = g.dir === 'up' ? -3 : g.dir === 'down' ? 3 : 0;
          ctx.beginPath();
          ctx.arc(c.x * CELL + CELL / 2 - 4 + ox, c.y * CELL + CELL / 2 - 2 + oy, 2.4, 0, Math.PI * 2);
          ctx.arc(c.x * CELL + CELL / 2 + 4 + ox, c.y * CELL + CELL / 2 - 2 + oy, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // HUD
      ctx.fillStyle = ink;
      ctx.font = "bold 18px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText(`${g.score}`, 10, 24);

      if (g.status !== 'running') {
        ctx.fillStyle = dark ? 'rgba(26,22,19,0.82)' : 'rgba(242,235,224,0.86)';
        ctx.fillRect(0, 0, W, H);

        if (g.status === 'idle') {
          ctx.fillStyle = ink;
          ctx.textAlign = 'center';
          ctx.font = "bold 26px 'Space Grotesk', system-ui, sans-serif";
          ctx.fillText('Pluggorm', W / 2, H / 2 - 16);
          ctx.font = "14px 'Space Mono', monospace";
          ctx.fillStyle = dark ? '#b4a89d' : '#6b5f54';
          ctx.fillText('Tryck på en pilknapp för att starta', W / 2, H / 2 + 12);
          ctx.fillText('☕ kaffeböna = +1   📙 bok = +3', W / 2, H / 2 + 34);
          ctx.textAlign = 'left';
        } else {
          const pw = 360;
          const ph = 156;
          const px = (W - pw) / 2;
          const py = (H - ph) / 2;
          ctx.fillStyle = dark ? '#26201c' : '#fff';
          ctx.strokeStyle = border;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(px, py, pw, ph, 12);
          ctx.fill();
          ctx.stroke();

          const medal = medalFor(g.score);
          ctx.textAlign = 'center';
          ctx.fillStyle = ink;
          ctx.font = "bold 26px 'Space Grotesk', system-ui, sans-serif";
          ctx.fillText('GAME OVER', W / 2, py + 36);
          ctx.font = "20px 'Space Grotesk', system-ui, sans-serif";
          ctx.fillText(`${medal.icon} ${medal.label}`, W / 2, py + 68);
          ctx.font = "14px 'Space Mono', monospace";
          ctx.fillStyle = dark ? '#b4a89d' : '#6b5f54';
          ctx.fillText(`Poäng ${g.score}   ·   Rekord ${best}`, W / 2, py + 96);
          if (g.newRecord && Math.floor(Date.now() / 350) % 2 === 0) {
            ctx.fillStyle = accent;
            ctx.font = "bold 16px 'Space Mono', monospace";
            ctx.fillText('★ NYTT REKORD! ★', W / 2, py + 122);
          } else if (!g.newRecord) {
            ctx.fillStyle = accent;
            ctx.font = "13px 'Space Mono', monospace";
            ctx.fillText('Tryck på en pilknapp för att spela igen →', W / 2, py + 122);
          }
          ctx.textAlign = 'left';
        }
      }
    };

    const loop = (t: number) => {
      const g = s.current;
      if (!g.last) g.last = t;
      const dt = t - g.last;
      g.last = t;
      if (g.status === 'running') {
        g.acc += dt;
        const ms = stepMs(g.score);
        while (g.acc >= ms) {
          step();
          g.acc -= ms;
          if (s.current.status !== 'running') break;
        }
      }
      draw();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [best]);

  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (s.current.status !== 'running') start();
    if (Math.abs(dx) > Math.abs(dy)) setDirection(dx > 0 ? 'right' : 'left');
    else setDirection(dy > 0 ? 'down' : 'up');
  };

  const DirBtn = ({ d, label }: { d: Dir; label: string }) => (
    <button
      onClick={() => {
        if (s.current.status !== 'running') start();
        setDirection(d);
      }}
      className="w-14 h-14 rounded-xl font-bold text-xl flex items-center justify-center active:scale-95"
      style={{ background: 'var(--surface2)', color: 'var(--ink)', border: '2px solid var(--border)', boxShadow: '3px 3px 0 var(--shadow)' }}
      aria-label={`Styr ${d}`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-xl mx-auto">
      <div
        className="rounded-xl overflow-hidden touch-none"
        style={{ border: '2px solid var(--border)', boxShadow: '4px 4px 0 var(--shadow)' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <canvas ref={canvasRef} width={W} height={H} className="w-full h-auto block" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="pp-mono text-sm" style={{ color: 'var(--ink-muted)' }}>
          POÄNG <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{score}</span>
          <span className="mx-2">·</span>
          REKORD <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{best}</span>
        </div>
        <button
          onClick={start}
          className="px-5 py-2.5 rounded-lg font-semibold text-white"
          style={{ background: '#e07a4f', border: '2px solid var(--border)', boxShadow: '3px 3px 0 var(--shadow)' }}
        >
          {status === 'running' ? 'Börja om' : status === 'over' ? 'Spela igen' : 'Starta'}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 w-max mx-auto sm:hidden">
        <div />
        <DirBtn d="up" label="↑" />
        <div />
        <DirBtn d="left" label="←" />
        <DirBtn d="down" label="↓" />
        <DirBtn d="right" label="→" />
      </div>
      <p className="mt-3 text-center pp-mono text-sm" style={{ color: 'var(--ink-muted)' }}>
        Piltangenter, WASD eller svep. Ät kaffebönor (+1) och fånga den gyllene boken (+3) innan den försvinner!
      </p>
    </div>
  );
}

export default SnakeGame;
