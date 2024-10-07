
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Job } from '../../../../types/types';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query<Job>('SELECT * FROM jobs ORDER BY created_at DESC');
    client.release();
    
    console.log('Fetched jobs:', result.rows); // デバッグ用ログ
    
    return NextResponse.json(
      { jobs: result.rows },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error in /api/jobs:', error);
    return NextResponse.json(
      { error: 'データの取得に失敗しました。' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
// app/api/jobs/route.ts

/*import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Job } from '../../../../types/types';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query<Job>('SELECT * FROM jobs ORDER BY created_at DESC');
    client.release();
    
    // キャッシュを無効にするヘッダーを追加
    return NextResponse.json(
      { jobs: result.rows },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error in /api/jobs:', error);
    return NextResponse.json(
      { error: 'データの取得に失敗しました。' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}*/