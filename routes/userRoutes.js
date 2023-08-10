import express from 'express';

import UserController from '../controllers/UserController.js';


const userRouter = express.Router();


userRouter.post('/sign-up', UserController.signUp);
userRouter.post('/verify-email/:token', UserController.verifyEmail);
userRouter.post('/sign-in', UserController.signIn);

export default userRouter;