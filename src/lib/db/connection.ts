import pgPromise from 'pg-promise';
import { env } from '@/config/env.js';

if(!env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be defined');
}

const pg = pgPromise();

export const db = pg({
  connectionString: env.DATABASE_URL
});
