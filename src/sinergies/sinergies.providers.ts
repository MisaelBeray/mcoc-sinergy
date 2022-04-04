import { Connection } from 'mongoose';
import { sinergiesSchema } from './entities/sinergy.entity';

export const sinergiesProviders = [
  {
    provide: 'SINERGIES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Sinergies', sinergiesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
