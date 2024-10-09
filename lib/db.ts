// lib/db.ts

import { Pool } from 'pg';

declare global {
  // グローバル変数に pool を追加（開発環境でのホットリロード対策）
  // eslint-disable-next-line no-var
  var pool: Pool | undefined;
}

const pool =
  global.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL, // Supabaseの接続情報を環境変数から取得
    ssl: {
      rejectUnauthorized: false, // SSLの自己署名証明書を許可
    },
    connectionTimeoutMillis: 5000, // タイムアウトを設定
  });

if (process.env.NODE_ENV !== 'production') {
  global.pool = pool;
}

export default pool;