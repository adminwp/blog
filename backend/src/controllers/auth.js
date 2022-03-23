/** @type {import('express').RequestHandler} */

const registerHandler = (req, res) => {
	console.log(req.body);
	if (!req.body || req.body.username === '' || req.body.email === '') {
		return res.status(400).send({
			status: false,
			message: 'نام کاربری و ایمیل رو هم ارسال کن رفیق.',
			messageStatus: 'error',
		});
	}

	const { username, email } = req.body;

	res.status(201).send({
		message: 'شما با موفقیت ثبت نام شدید',
		status: true,
		messageStatus: 'success',
		user: {
			username,
			email,
		},
	});
};

/** @type {import('express').RequestHandler} */

const loginHandler = (req, res) => {};

export { registerHandler, loginHandler };
