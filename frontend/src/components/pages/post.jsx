import styles from '../../styles/post.module.css';

const Post = ({ title, body }) => {
	return (
		<article className={styles.post}>
			<header className='post__header'>
				<h4 className={styles.postTitle}>{title}</h4>
			</header>

			<p className={styles.postBody}>{body}</p>
			<a href='#' className={styles.postReadMeBtn}>
				ReadMe
			</a>
		</article>
	);
};

export default Post;
