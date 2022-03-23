import PostModel from '../models/Post.js';

// import { addPost, deletePost, getPosts } from '../utils/posts.js';

/** @type {import('express').RequestHandler} */
const getPostsHandler = async (req, res) => {
	const posts = await PostModel.getAllPost();
	return res.status(200).json({
		status: true,
		message: 'fetched successfully posts',
		posts,
	});
};

/** @type {import('express').RequestHandler} */
const addPostHandler = async (req, res) => {
	try {
		if (!req.body.title || !req.body.body) {
			return res.status(400).send({ status: false, message: 'please add title and body for add post' });
		}

		const { title, body } = req.body;

		const newPost = new PostModel(title, body);

		const addPostsMessage = await newPost.add();

		console.log(addPostsMessage);

		res.status(201).json({
			status: true,
			message: 'Post With Added Successfully',
		});
	} catch (error) {
		res.status(400).json({
			status: false,
			message: error.message,
		});
	}
};

const updatePostHandler = async (req, res) => {
	try {
		const { title, body } = req.body;

		if (!req.params.id) {
			return res.status(400).send({ status: false, message: 'please enter id posts want updated' });
		}

		if (!req.body || !title || !body) {
			return res.status(400).json({
				status: false,
				message: `Please Add title and body for updated post`,
			});
		}

		const isPost = await PostModel.find(req.params.id);

		if (!isPost) {
			return res.status(400).json({
				status: false,
				message: `Not Have a Post with ${req.params.id}`,
			});
		}

		const updatedPostMessage = await PostModel.update(req.params.id, {
			title,
			body,
		});

		console.log(updatedPostMessage);

		return res.status(201).json({
			status: true,
			message: 'Post With Updated Successfully',
		});
	} catch (error) {
		return res.status(400).json({
			status: false,
			message: error.message,
		});
	}
};

/** @type {import('express').RequestHandler} */
const deletePostHandler = async (req, res) => {
	console.log('Deleted Post ...');

	if (!req.params.id) {
		return res.status(400).send({ status: false, message: 'please enter id posts want remove' });
	}
	try {
		const isPost = await PostModel.find(req.params.id);

		if (!isPost) {
			res.status(400).json({
				status: false,
				message: `Not Have a Post with ${req.params.id}`,
			});
		}

		const deletePostMessage = await PostModel.deletePost(req.params.id);

		console.log(deletePostMessage);

		res.status(201).json({
			status: true,
			message: 'Post With Deleted Successfully',
		});
	} catch (error) {
		res.status(400).json({
			status: false,
			message: error.message,
		});
	}
};

export { getPostsHandler, addPostHandler, updatePostHandler, deletePostHandler };
