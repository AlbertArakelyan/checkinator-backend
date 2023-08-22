import express from 'express';

import PlanItemController from '../controllers/PlanItemController.js';

import UserMiddleware from '../middlewares/User.js';

const planItemRouter = express.Router();

planItemRouter.post('/', UserMiddleware.auth, UserMiddleware.admin, PlanItemController.create);
planItemRouter.get('/', UserMiddleware.auth, UserMiddleware.admin, PlanItemController.getAll);
planItemRouter.get('/:id', UserMiddleware.auth, UserMiddleware.admin, PlanItemController.getOne);
planItemRouter.put('/:id', UserMiddleware.auth, UserMiddleware.admin, PlanItemController.update);
planItemRouter.delete('/:id', UserMiddleware.auth, UserMiddleware.admin, PlanItemController.delete);

export default planItemRouter;