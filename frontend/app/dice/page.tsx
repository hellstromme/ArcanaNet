'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface DiceRollResult {
  expression: string;
  total: number;
  rolls: number[];
}

let socket: Socket | undefined;

export default function DicePage() {
  const [expression, setExpression] = useState('1d20');
  const [history, setHistory] = useState<DiceRollResult[]>([]);

  useEffect(() => {
    socket = io('http://localhost:3001/dice');
    socket.on('roll-result', (result: DiceRollResult) => {
      setHistory((current) => [result, ...current]);
    });

    return () => {
      socket?.disconnect();
    };
  }, []);

  const handleRoll = () => {
    socket?.emit('roll', expression);
  };

  return (
    <section className="card">
      <h2>Dice Roller</h2>
      <p>Trigger server-authoritative dice rolls and broadcast results to the table.</p>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          value={expression}
          onChange={(event) => setExpression(event.target.value)}
          placeholder="Enter dice expression (e.g., 4d6)"
        />
        <button type="button" onClick={handleRoll}>
          Roll Dice
        </button>
      </div>
      <div>
        <h3>History</h3>
        <ul>
          {history.map((result, index) => (
            <li key={index}>
              {result.expression}: {result.total} [{result.rolls.join(', ')}]
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
