import { Request, Response } from 'express';
import { connect } from '../database';
import { Post } from '../interface/Post';

export async function getPosts(req: Request, res: Response): Promise<Response> {
	const conn = await connect();
	const posts = await conn.query('SELECT * FROM post');
	return res.json(posts[0]);
}

export async function createPost(req: Request, res: Response): Promise<Response> {
	const newPost: Post = req.body;
	const conn = await connect();
	await conn.query('INSERT INTO post SET ?', [newPost]);
	console.log(newPost);
	return res.json({ message: 'post created' });
}

export async function getPost(req: Request, res: Response): Promise<Response> {
	const postId = req.params.postId;
	const conn = await connect();
	const post = await conn.query('SELECT * FROM post WHERE id = ?', [postId]);
	console.log(post[0]);
	return res.json(post[0]);
}

export async function deletePost(req: Request, res: Response): Promise<Response> {
	const postId = req.params.postId;
	const conn = await connect();
	const post = await conn.query('DELETE FROM post WHERE id = ?', [postId]);
	return res.json({
		message: 'post deleted',
	});
}

export async function updatePost(req: Request, res: Response): Promise<Response> {
  const postId = req.params.postId;
  const updatePost: Post = req.body;
  const conn = await connect();
  await conn.query('UPDATE post SET ? WHERE id = ?', [updatePost, postId]);
  return res.json({
    message: 'post updated',
  });
}