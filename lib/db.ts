// lib/db.ts
// lib/db.ts
import { Pool } from 'pg';

declare global {
  // グローバルスコープに pool を追加
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