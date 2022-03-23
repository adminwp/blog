import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';
const postsPath = path.resolve(process.cwd(), 'src', 'data', 'posts.json');

class PostModel {
	constructor(title, body) {
		this.title = title;
		this.body = body;
	}

	static async getAllPost() {
		try {
			if (!existsSync(postsPath)) {
				await fs.writeFile(postsPath, '[]', { encoding: 'utf-8' });
			}

			const postsString = await fs.readFile(postsPath, { encoding: 'utf-8' });

			const posts = JSON.parse(postsString);

			return posts;
		} catch (error) {
			return error;
		}
	}

	static async deletePost(id) {
		try {
			if (!existsSync(postsPath)) {
				process.exit(1);
			}

			const posts = await PostModel.getAllPost();

			const postsFilter = posts.filter((post) => {
				return post._id !== Number(id);
			});

			console.log(postsFilter);

			await fs.writeFile(postsPath, JSON.stringify(postsFilter));

			return 'Created Posts Again';
		} catch (error) {
			return error;
		}
	}

	async add() {
		try {
			if (!existsSync(postsPath)) {
				await fs.writeFile(postsPath, '[]', { encoding: 'utf-8' });
			}

			const posts = await PostModel.getAllPost();

			let id = posts[posts.length - 1] ? posts[posts.length - 1]._id : 0;

			posts.push({
				_id: ++id,
				title: this.title,
				body: this.body,
			});

			await fs.writeFile(postsPath, JSON.stringify(posts));

			return 'Added Post With SucessFull';
		} catch (error) {
			return error;
		}
	}

	static async update(id, { title, body }) {
		try {
			const posts = await PostModel.getAllPost();

			const newPost = posts.find((post) => post._id === Number(id));

			const newPostIndex = posts.indexOf(newPost);

			console.log('newPostIndex', newPostIndex);

			if (title && body) {
				console.log('title', title);
				console.log('body', body);
				newPost.title = title;
				newPost.body = body;

				posts[newPostIndex] = newPost;

				await fs.writeFile(postsPath, JSON.stringify(posts), { encoding: 'utf-8' });

				return 'Successfully Updated Post';
			}
		} catch (error) {
			return error;
		}
	}

	static async find(id) {
		const posts = await PostModel.getAllPost();
		console.log('posts in find', posts);
		const isPost = posts.find((post) => {
			return post._id === Number(id);
		});

		return isPost ? true : false;
	}
}

export default PostModel;
