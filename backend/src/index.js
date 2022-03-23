import chalk from 'chalk';
import getPort, { portNumbers } from 'get-port';
import app from './app.js';

getPort({ port: portNumbers(3000, 3100) })
	.then((port) => {
		app.listen(port, (_) => {
			console.log(chalk.blueBright(`Server Running on http://localhost:${port}`));
		});
	})
	.catch((err) => console.error(err));
