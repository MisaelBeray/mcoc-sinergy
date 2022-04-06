import { Connection } from 'mongoose';
import { usersSchema } from './entities/user.entity';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Users', usersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
