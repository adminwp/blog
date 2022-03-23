import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';

const getPosts = async () => {
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
};

const addPost = async ({ title, body }) => {
	try {
		if (!existsSync(postsPath)) {
			await fs.writeFile(postsPath, '[]', { encoding: 'utf-8' });
		}

		const posts = await getPosts();

		let id = posts[posts.length - 1] ? posts[posts.length - 1]._id : 0;

		posts.push({
			_id: ++id,
			title,
			body,
		});

		await fs.writeFile(postsPath, JSON.stringify(posts));

		return 'Created Posts Again';
	} catch (error) {
		return error;
	}
};

const deletePost = async (id) => {
	try {
		if (!existsSync(postsPath)) {
			process.exit(1);
		}

		console.log('id in deletePOST', typeof id);
		const posts = await getPosts();

		const postsFilter = posts.filter((post) => {
			return post._id !== Number(id);
		});

		console.log(postsFilter);

		await fs.writeFile(postsPath, JSON.stringify(postsFilter));

		return 'Created Posts Again';
	} catch (error) {
		return error;
	}
};

export { getPosts, addPost, deletePost };
