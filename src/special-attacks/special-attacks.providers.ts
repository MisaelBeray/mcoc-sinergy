import { Connection } from 'mongoose';
import { specialAttacksSchema } from './entities/special-attack.entity';

export const specialAttacksProviders = [
  {
    provide: 'SPECIAL_ATTACKS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Special_Attacks', specialAttacksSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
