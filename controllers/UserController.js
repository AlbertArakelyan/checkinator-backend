import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import User from '../models/User.js';

import Controller from './Controller.js';

import { transporter } from '../utils/index.js';

import {
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
  USER,
  RECEIVED,
  somethingWentWrong,
  userControllerMessages,
} from '../constants/index.js';


dotenv.config();

class UserController extends Controller {
  static async signUp(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: userControllerMessages.alreadyExists,
          statusCode: BAD_REQUEST,
        });
      }

      if (password !== confirmPassword) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: userControllerMessages.passwordsDontMatch,
          statusCode: BAD_REQUEST,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: USER,
        isEmailVerified: false,
      });

      const verificationToken = jwt.sign({
        userId: user._id,
      }, process.env.JWT_SECRET);

      const verificationUrl = `${process.env.NODEMAILER_WEBSITE_URL}verify/${verificationToken}`;

      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: userControllerMessages.pleaseVerifyYourEmail,
        html: `Please click this link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
      };

      let sendEmailError;

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          sendEmailError = error;
          return;
        }

        console.log(`Email sent: ${info.response}`);
      });

      if (sendEmailError) {
        throw new Error(sendEmailError);
      }

      await user.save();

      res.status(CREATED).json({
        success: true,
        data: {
          email,
        },
        message: userControllerMessages.verifyEail,
        statusCode: CREATED,
      });
    } catch (error) {
      super.catchError(error);
      res.status(SERVER_ERROR).json({
        success: false,
        message: error.message || somethingWentWrong,
        statusCode: SERVER_ERROR,
      });
    }
  }

  static async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(userId);

      user.isEmailVerified = true;

      await user.save();

      res.status(RECEIVED).json({
        success: true,
        data: {
          token,
          isEmailVerified: true,
        },
        message: userControllerMessages.emailVerified,
        statusCode: RECEIVED,
      });
    } catch (error) {
      super.catchError(error);
      res.status(SERVER_ERROR).json({
        success: false,
        message: error.message || somethingWentWrong,
        statusCode: SERVER_ERROR,
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: userControllerMessages.invalidEmailOrPassword,
          statusCode: BAD_REQUEST,
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: userControllerMessages.invalidEmailOrPassword,
          statusCode: BAD_REQUEST,
        });
      }

      if (!user.isEmailVerified) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: userControllerMessages.emailNotVerified,
          statusCode: BAD_REQUEST,
        });
      }

      const userData = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }

      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

      res.status(RECEIVED).json({
        success: true,
        data: {
          accessToken,
          userData,
        },
        message: userControllerMessages.loginSuccess,
        statusCode: RECEIVED,
      });
    } catch (error) {
      super.catchError(error);
      res.status(SERVER_ERROR).json({
        success: false,
        message: error.message || somethingWentWrong,
        statusCode: SERVER_ERROR,
      });
    }
  }

  static async getUsers(req, res) {
    try {
      // TODO add admin permission via middleware
      const { skip = 0, limit = 10 } = req.query;

      const users = await User.find({}, null, {
        skip,
        limit,
      });

      const totalUsers = await User.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);

      res.status(RECEIVED).json({
        success: true,
        data: {
          data: users,
          pageInfo: {
            page: Math.floor(skip / limit) + 1,
            skip,
            limit,
            total: totalUsers,
            pages: totalPages,
            pageUrl: null,
            nextPageUrl: null,
            prevPageUrl: null,
          },
        },
        message: userControllerMessages.usersReceived,
        statusCode: RECEIVED,
      });
    } catch (error) {
      super.catchError(error);
      res.status(SERVER_ERROR).json({
        success: false,
        message: error.message || somethingWentWrong,
        statusCode: SERVER_ERROR,
      });
    }
  }
}

export default UserController;