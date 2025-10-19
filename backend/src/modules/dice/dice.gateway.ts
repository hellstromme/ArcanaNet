import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DiceService } from './dice.service';

@WebSocketGateway({ namespace: '/dice' })
export class DiceGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly diceService: DiceService) {}

  @SubscribeMessage('roll')
  handleRoll(@MessageBody() expression: string) {
    const result = this.diceService.roll(expression);
    this.server.emit('roll-result', result);
    return result;
  }
}
