import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { AuthModule } from '../auth/auth.module';
import { GamesModule } from '../games/games.module';
import { SheetsModule } from '../sheets/sheets.module';
import { DiceModule } from '../dice/dice.module';
import { PluginsModule } from '../plugins/plugins.module';
import { IdentityModule } from '../identity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    GamesModule,
    SheetsModule,
    DiceModule,
    PluginsModule,
    IdentityModule,
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class AppModule {}
