// src/database/database.providers.ts
import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONO_DB_CONNECTION_STRING || 'mongodb://localhost/mcoc-sinergy'),
  },
];
