import { Connection } from 'mongoose';
import { ChampionsSchema } from './entities/champion.entity';

export const championsProviders = [
  {
    provide: 'CHAMPIONS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Champions', ChampionsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
