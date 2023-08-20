import express from 'express';

import PlanItemController from '../controllers/PlanItemController.js';

const planItemRouter = express.Router();

planItemRouter.post('/', PlanItemController.create);
planItemRouter.get('/', PlanItemController.getAll);
planItemRouter.get('/:id', PlanItemController.getOne);
planItemRouter.put('/:id', PlanItemController.update);
planItemRouter.delete('/:id', PlanItemController.delete);

export default planItemRouter;