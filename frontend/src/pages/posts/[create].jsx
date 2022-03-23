import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/create-post.module.css';

const CreatePost = () => {
	const router = useRouter();

	const [post, setPost] = useState({ title: '', body: '' });

	const submitHandler = async (e) => {
		e.preventDefault();

		const isValidPost = post.title !== '' && post.body !== '';

		if (isValidPost) {
			try {
				const sendPost = await fetch(
					'http://localhost:3001/api/v1/posts/create',
					{
						method: 'post',
						headers: {
							mode: 'no-cors',
							'Content-Type': 'application/json',
							Accept: 'application/json',
							'Access-Control-Allow-Origin': 'http://localhost:3000',
							'Access-Control-Allow-Credentials': 'true',
							'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
							'Access-Control-Allow-Headers':
								'Origin, Content-Type, Accept',
						},
						cors: '*',
						body: JSON.stringify(post),
					}
				);

				const responsePost = await sendPost.json();
				console.log('responsePost', responsePost);

				router.push('/posts');
			} catch (error) {
				console.log('error', error);
			}
		}

		console.log('form not valid');
	};

	const inputHandler = (e) => {
		setPost((post) => {
			return {
				...post,
				[e.target.name]: e.target.value.trim(),
			};
		});
	};

	const inputEffectHandler = (e) => {
		const { currentTarget } = e;

		const formGroup = currentTarget.parentElement;

		formGroup.classList.add('active');

		console.log(formGroup.className);
	};

	useEffect(() => {
		console.log('post', post);
	}, [post]);

	return (
		<form onSubmit={submitHandler} className={styles.form}>
			<h1 className={styles.formTitle}>Create Post </h1>
			<div className={styles.formGroup}>
				<input
					required
					onFocus={inputEffectHandler}
					name='title'
					onChange={inputHandler}
					type='text'
					className={styles.formInput}
				/>
				<label htmlFor='' className={styles.formLabel}>
					Title
				</label>
			</div>

			<div className={styles.formGroup}>
				<input
					required
					type='text'
					name='body'
					onFocus={inputEffectHandler}
					onChange={inputHandler}
					className={styles.formInput}
				/>
				<label htmlFor='' className={styles.formLabel}>
					Body
				</label>
			</div>

			<button type='submit' className={styles.formBtn}>
				Created
			</button>
		</form>
	);
};

export default CreatePost;
