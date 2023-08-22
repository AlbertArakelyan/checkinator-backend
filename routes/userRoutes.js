import express from 'express';

import UserController from '../controllers/UserController.js';

import UserMiddleware from '../middlewares/User.js';

const userRouter = express.Router();


userRouter.post('/sign-up', UserController.signUp);
userRouter.post('/verify-email/:token', UserController.verifyEmail);
userRouter.post('/sign-in', UserController.signIn);
userRouter.get('/', UserMiddleware.auth, UserMiddleware.admin, UserController.getUsers);

export default userRouter;