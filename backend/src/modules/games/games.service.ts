import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateGameDto } from './interfaces/create-game.dto';
import { GameSummary } from './interfaces/game-summary.interface';

@Injectable()
export class GamesService {
  private readonly games: GameSummary[] = [];

  list(): GameSummary[] {
    return this.games;
  }

  create(createGameDto: CreateGameDto): GameSummary {
    const game: GameSummary = {
      id: uuid(),
      title: createGameDto.title,
      system: createGameDto.system,
      gmId: createGameDto.gmId,
      scheduledFor: createGameDto.scheduledFor,
    };
    this.games.push(game);
    return game;
  }
}
