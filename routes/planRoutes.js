import express from 'express';

import PlanController from '../controllers/PlanController.js';

const planRouter = express.Router();

planRouter.post('/', PlanController.create);
planRouter.get('/', PlanController.getAll);
planRouter.get('/:id', PlanController.getOne);
planRouter.put('/:id', PlanController.update);
planRouter.delete('/:id', PlanController.delete);

export default planRouter;