import Head from 'next/head';
import Posts from '../../components/pages/posts';
const PostsPage = ({ posts }) => {
	if (posts.length && posts.length > 0) {
		return (
			<>
				<Head>
					<meta name='theme-color' content='#3a4453' />
					<meta name='author' content='Ehsan Javani' />
				</Head>

				<Posts posts={posts} />
			</>
		);
	}

	return (
		<>
			<Head>
				<meta name='theme-color' content='#3a4453' />
				<meta name='author' content='Ehsan Javani' />
			</Head>
			<p>Not Found Posts ...</p>;
		</>
	);
};

export async function getServerSideProps() {
	const request = await fetch('http://localhost:3001/api/v1/posts');

	const getPosts = await request.json();

	return {
		props: {
			posts: getPosts.posts,
		},
	};
}

export default PostsPage;
