import { useState, useEffect, useCallback, useRef } from 'react';
import { readNumber, writeNumber } from '../utils/safeStorage';
import { isInteractiveTarget } from '../utils/keyboard';

export type Board = number[][];
const SIZE = 4;
const STORAGE_KEY = '2048-best';

function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function getEmptyCells(board: Board): [number, number][] {
  const cells: [number, number][] = [];
  board.forEach((row, r) =>
    row.forEach((val, c) => {
      if (val === 0) cells.push([r, c]);
    })
  );
  return cells;
}

function addRandomTile(board: Board): Board {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const next = board.map(row => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slideRow(row: number[]): { row: number[]; gained: number } {
  const filtered = row.filter(v => v !== 0);
  const result: number[] = [];
  let gained = 0;
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      result.push(filtered[i] * 2);
      gained += filtered[i] * 2;
      i += 2;
    } else {
      result.push(filtered[i]);
      i += 1;
    }
  }
  while (result.length < SIZE) result.push(0);
  return { row: result, gained };
}

function transpose(board: Board): Board {
  return board[0].map((_, c) => board.map(row => row[c]));
}

function reverseRows(board: Board): Board {
  return board.map(row => [...row].reverse());
}

function move(board: Board, direction: 'left' | 'right' | 'up' | 'down'): { board: Board; gained: number; moved: boolean } {
  let working = board;
  if (direction === 'up') working = transpose(working);
  if (direction === 'down') working = reverseRows(transpose(working));
  if (direction === 'right') working = reverseRows(working);

  let gained = 0;
  const slid = working.map(row => {
    const res = slideRow(row);
    gained += res.gained;
    return res.row;
  });

  let result = slid;
  if (direction === 'up') result = transpose(result);
  if (direction === 'down') result = transpose(reverseRows(result));
  if (direction === 'right') result = reverseRows(result);

  const moved = JSON.stringify(result) !== JSON.stringify(board);
  return { board: result, gained, moved };
}

function canMove(board: Board): boolean {
  if (getEmptyCells(board).length > 0) return true;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const val = board[r][c];
      if (r + 1 < SIZE && board[r + 1][c] === val) return true;
      if (c + 1 < SIZE && board[r][c + 1] === val) return true;
    }
  }
  return false;
}

export function use2048() {
  const [board, setBoard] = useState<Board>(() => addRandomTile(addRandomTile(emptyBoard())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => readNumber(STORAGE_KEY));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  // Spelaren kan välja att fortsätta efter 2048 – sidans egen FAQ lovar det uttryckligen.
  const [keepPlaying, setKeepPlaying] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const newGame = useCallback(() => {
    setBoard(addRandomTile(addRandomTile(emptyBoard())));
    setScore(0);
    setGameOver(false);
    setWon(false);
    setKeepPlaying(false);
  }, []);

  const continueGame = useCallback(() => setKeepPlaying(true), []);

  const doMove = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;
    setBoard(prev => {
      const { board: nextBoard, gained, moved } = move(prev, direction);
      if (!moved) return prev;
      const withTile = addRandomTile(nextBoard);
      setScore(s => {
        const newScore = s + gained;
        setBest(b => {
          const newBest = Math.max(b, newScore);
          if (newBest !== b) writeNumber(STORAGE_KEY, newBest);
          return newBest;
        });
        return newScore;
      });
      if (withTile.some(row => row.some(v => v >= 2048))) setWon(true);
      if (!canMove(withTile)) setGameOver(true);
      return withTile;
    });
  }, [gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, 'left' | 'right' | 'up' | 'down'> = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down',
      };
      if (isInteractiveTarget(e.target)) return;
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        doMove(dir);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [doMove]);

  // Touch controls
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      doMove(dx > 0 ? 'right' : 'left');
    } else {
      doMove(dy > 0 ? 'down' : 'up');
    }
  }, [doMove]);

  return {
    board,
    score,
    best,
    gameOver,
    won: won && !keepPlaying,
    newGame,
    continueGame,
    doMove,
    onTouchStart,
    onTouchEnd,
  };
}
