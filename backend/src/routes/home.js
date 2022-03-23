import { Router } from 'express';
import { homePageController } from '../controllers/index.js';

const homeRouter = Router();

homeRouter.get('/', homePageController);

export default homeRouter;
