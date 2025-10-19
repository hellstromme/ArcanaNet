import { Injectable } from '@nestjs/common';

export interface DiceRollResult {
  expression: string;
  total: number;
  rolls: number[];
}

@Injectable()
export class DiceService {
  roll(expression: string): DiceRollResult {
    const [countStr, sidesStr] = expression.toLowerCase().split('d');
    const count = parseInt(countStr, 10) || 1;
    const sides = parseInt(sidesStr, 10) || 20;
    const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * sides));
    const total = rolls.reduce((sum, roll) => sum + roll, 0);
    return { expression, total, rolls };
  }
}
