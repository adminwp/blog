import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/posts', postsRouter);

app.use((req, res) => {
	res.send('Please Read a Document API');
});

export default app;
