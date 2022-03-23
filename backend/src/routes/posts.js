import { Router } from 'express';
import { addPostHandler, deletePostHandler, getPostsHandler, updatePostHandler } from '../controllers/posts.js';

const postsRouter = Router();

postsRouter.get('/', getPostsHandler);

postsRouter.post('/create', addPostHandler);

postsRouter.delete('/delete/:id', deletePostHandler);

postsRouter.put('/update/:id', updatePostHandler);

export default postsRouter;
