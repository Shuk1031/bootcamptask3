// lib/db.ts

/*import { Pool } from 'pg';

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

export default pool;*/
// lib/db.ts

import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PG_HOST, // Supabaseのホスト名
  port: Number(process.env.PG_PORT || 5432), // ポート番号
  user: process.env.PG_USER, // ユーザー名
  password: process.env.PG_PASSWORD, // パスワード
  database: process.env.PG_DATABASE, // データベース名
  ssl: {
    rejectUnauthorized: false, // SSL接続を許可
  },
});

export default pool;