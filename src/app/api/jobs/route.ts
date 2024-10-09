
/*import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Job } from '../../../../types/types';

export async function GET() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query<Job>('SELECT * FROM jobs ORDER BY created_at DESC');
    console.log(result.rows);  // これを追加してデータの取得結果を確認
    
    
    console.log('Fetched jobs from DB:', result.rows); // デバッグ用ログ
    
    return NextResponse.json(
      { jobs: result.rows },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' ,}, }
    );
  } catch (error) {
    console.error('Error in /api/jobs:', error);
    return NextResponse.json(
      { error: 'データの取得に失敗しました。' },
      { status: 500, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    );
  } finally{
    if(client){
      client.release();
    }
  }
}*/
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Job } from '../../../../types/types';

export async function GET() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query<Job>('SELECT * FROM jobs ORDER BY created_at DESC');
    console.log('Fetched jobs from DB:', result.rows); // デバッグ用ログ

    return NextResponse.json(result.rows, {
      headers: {
        'Cache-Control': 'no-store',
        'CDN-Cache-Control':'no-store',
        'Vercel-CDN-Cache-Control':'no-store'
      },
    });
  } catch (error) {
    console.error('Error in /api/jobs:', error);
    return NextResponse.json(
      { error: 'データの取得に失敗しました。' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
          'CDN-Cache-Control':'no-store',
          'Vercel-CDN-Cache-Control':'no-store'
        },
      }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}