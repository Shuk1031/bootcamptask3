// lib/db.ts
import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var pool: Pool | undefined;
}

const pool = global.pool || new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

if (process.env.NODE_ENV !== 'production') {
  // 開発環境ではグローバル変数を再利用
  global.pool = pool;
}

export default pool;