/** @type {import('express').RequestHandler} */

const homePageController = (req, res) => {
	res.send('Home Page ....');
};

export { homePageController };
