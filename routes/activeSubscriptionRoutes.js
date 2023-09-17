import express from 'express';

import ActiveSubscriptionController from '../controllers/ActiveSubscriptionController.js';

import UserMiddleware from '../middlewares/User.js';

const activeSubscriptionRouter = express.Router();

activeSubscriptionRouter.post('/create-checkout-session', UserMiddleware.auth, UserMiddleware.admin, ActiveSubscriptionController.createCheckoutSession);
activeSubscriptionRouter.post('/', UserMiddleware.auth, ActiveSubscriptionController.create);

export default activeSubscriptionRouter;