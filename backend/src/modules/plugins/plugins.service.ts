import { Injectable } from '@nestjs/common';
import { GameSystemManifest } from './types/game-system-manifest.interface';

@Injectable()
export class PluginsService {
  private readonly manifests: GameSystemManifest[] = [
    {
      id: 'dnd-5e',
      name: 'Dungeons & Dragons 5e',
      version: '0.1.0',
      schema: {
        abilityScores: ['str', 'dex', 'con', 'int', 'wis', 'cha'],
      },
    },
  ];

  list(): GameSystemManifest[] {
    return this.manifests;
  }
}
