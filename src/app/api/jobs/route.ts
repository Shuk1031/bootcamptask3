
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Job } from '../../../../types/types';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM jobs ORDER BY created_at DESC');
    client.release();
    return NextResponse.json({ jobs: result.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'データの取得に失敗しました。' }, { status: 500 });
  }
}