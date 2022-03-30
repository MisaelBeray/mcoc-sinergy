import { Connection } from 'mongoose';
import { skillsSchema } from './entities/skill.entity';

export const skillsProviders = [
  {
    provide: 'SKILLS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Skills', skillsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
