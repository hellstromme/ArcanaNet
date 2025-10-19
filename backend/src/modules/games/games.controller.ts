import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './interfaces/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  list() {
    return this.gamesService.list();
  }

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }
}
