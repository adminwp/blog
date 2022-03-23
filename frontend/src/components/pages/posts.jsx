import styles from '../../styles/posts.module.css';
import Post from './post';

const Posts = ({ posts }) => {
	return (
		<section className={styles.posts}>
			{posts.map((post) => (
				<Post body={post.body} title={post.title} key={post._id} />
			))}
		</section>
	);
};

export default Posts;
