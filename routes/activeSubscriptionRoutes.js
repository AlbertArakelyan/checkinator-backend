import express from 'express';

import ActiveSubscriptionController from '../controllers/ActiveSubscriptionController.js';

import UserMiddleware from '../middlewares/User.js';

const activeSubscriptionRouter = express.Router();

activeSubscriptionRouter.post('/create-checkout-session', UserMiddleware.auth, ActiveSubscriptionController.createCheckoutSession);
activeSubscriptionRouter.post('/', UserMiddleware.auth, ActiveSubscriptionController.create);
activeSubscriptionRouter.get('/', UserMiddleware.auth, ActiveSubscriptionController.getCurrentActiveSubscription);

export default activeSubscriptionRouter;