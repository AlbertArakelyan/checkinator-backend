import express from 'express';

import PlanController from '../controllers/PlanController.js';

import UserMiddleware from '../middlewares/User.js';

const planRouter = express.Router();

planRouter.post('/', UserMiddleware.auth, UserMiddleware.admin, PlanController.create);
planRouter.get('/', UserMiddleware.auth, PlanController.getAll);
planRouter.get('/:id', UserMiddleware.auth, PlanController.getOne);
planRouter.put('/:id', UserMiddleware.auth, UserMiddleware.admin, PlanController.update);
planRouter.delete('/:id', UserMiddleware.auth, UserMiddleware.admin, PlanController.delete);

export default planRouter;