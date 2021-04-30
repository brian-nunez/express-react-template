import express from 'express';
import controller from '../controllers/homeController';

const homeRouter = express.Router();

export default function router() {
  homeRouter.get('/', controller.renderHomePage);

  return homeRouter;
}
