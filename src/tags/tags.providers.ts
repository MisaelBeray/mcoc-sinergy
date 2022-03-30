import { Connection } from 'mongoose';
import { tagsSchema } from './entities/tag.entity';

export const tagsProviders = [
  {
    provide: 'TAGS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Tags', tagsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
