// app/api/postJob/route.ts

/**import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Job } from '../../../../types/types';

export async function POST(request: Request) {
  let client;
  try {
    const { title, salary, category } = await request.json();

    // バリデーション
    if (!title || salary === undefined || !category) {
      return NextResponse.json({ error: 'すべてのフィールドを入力してください。' }, { status: 400 });
    }

    client = await pool.connect();
    const insertQuery = `
      INSERT INTO jobs (title, salary, category)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [title, salary, category || ''];

    const result = await client.query<Job>(insertQuery, values);
    console.log('Inserted job:', result.rows[0]);

    return NextResponse.json(
      { message: '求人情報が追加されました。', job: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in /api/postJob:', error);
    return NextResponse.json({ error: 'データの投稿に失敗しました。' }, { status: 500 });
  } finally {
    if (client) {
      client.release();
    }
  }
}*/
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';
import { Job } from '../../../../types/types';

export async function POST(request: Request) {
  let client;
  try {
    const { title, salary, category } = await request.json();

    // バリデーション
    if (!title || salary === undefined || !category) {
      return NextResponse.json({ error: 'すべてのフィールドを入力してください。' }, { status: 400 });
    }

    client = await pool.connect();
    await client.query('BEGIN'); // トランザクション開始

    const insertQuery = `
      INSERT INTO jobs (title, salary, category)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [title, salary, category || ''];

    const result = await client.query<Job>(insertQuery, values);

    await client.query('COMMIT'); // トランザクションコミット
    console.log('Inserted job:', result.rows[0]);

    return NextResponse.json(
      { message: '求人情報が追加されました。', job: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK'); // エラー時にロールバック
    }
    console.error('Error in /api/postJob:', error);
    return NextResponse.json({ error: 'データの投稿に失敗しました。' }, { status: 500 });
  } finally {
    if (client) {
      client.release();
    }
  }
}