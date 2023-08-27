import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import {
  SERVER_ERROR,
  UNAUTHORIZED,
  ADMIN,
  somethingWentWrong,
  userMiddlewareMessages,
} from '../constants/index.js';


dotenv.config();

class UserMiddleware {
  static async auth(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(UNAUTHORIZED).json({
            success: false,
            message: userMiddlewareMessages.invalidOrExpiredToken,
            statusCode: UNAUTHORIZED,
          });
        }

        req.user = decoded;
        next();
      });
    } catch (error) {
      console.log(error);
      res.status(SERVER_ERROR).json({
        success: false,
        message: error.message || somethingWentWrong,
        statusCode: SERVER_ERROR,
      });

    }
  }

  static async admin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(UNAUTHORIZED).json({
            success: false,
            message: userMiddlewareMessages.invalidOrExpiredToken,
            statusCode: UNAUTHORIZED,
          });
        }

        if (decoded.role !== ADMIN) {
          return res.status(UNAUTHORIZED).json({
            success: false,
            message: userMiddlewareMessages.notAdmin,
            statusCode: UNAUTHORIZED,
          });
        }

        next();
      });
    } catch (error) {
      console.log(error);
      res.status(SERVER_ERROR).json({
        success: false,
        message: error.message || somethingWentWrong,
        statusCode: SERVER_ERROR,
      });
    }
  }
}

export default UserMiddleware;