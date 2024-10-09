// app/api/postJob/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Job } from '../../../../types/types';

export async function POST(request: Request) {
  try {
    const { title, salary, category } = await request.json();

    // バリデーション
    if (!title || !salary || !category) {
      return NextResponse.json({ error: 'すべてのフィールドを入力してください。' }, { status: 400 });
    }

    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO jobs (title, salary, category)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [title, salary, category || ''];
    // クエリにジェネリック型を適用
    const result = await client.query<Job>(insertQuery, values);
    console.log('Inserted job:', result.rows[0]);
    client.release();

    return NextResponse.json({ message: '求人情報が追加されました。', job: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'データの投稿に失敗しました。' }, { status: 500 });
  }
}