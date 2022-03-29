import { Connection } from 'mongoose';
import { championsSchema } from './entities/champion.entity';

export const championsProviders = [
  {
    provide: 'CHAMPIONS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Champions', championsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
