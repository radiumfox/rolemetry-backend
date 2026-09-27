import pgPromise from 'pg-promise';

const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;

if(!DATABASE_URL) {
  throw new Error('DATABASE_URL must be defined');
}

const pg = pgPromise();

export const db = pg({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
