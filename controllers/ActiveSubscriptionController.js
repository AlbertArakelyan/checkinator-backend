import stripe from 'stripe';
import moment from 'moment';

import Controller from './Controller.js';

import ActiveSubscription from '../models/ActiveSubscription.js';

import {
  SERVER_ERROR,
  RECEIVED,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  activeSubscriptionControllerMessages,
  somethingWentWrong,
} from '../constants/index.js';

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

class ActiveSubscriptionController extends Controller {
  static async createCheckoutSession(req, res) {
    try {
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${req.body.name} Plan`,
              },
              unit_amount: req.body.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success?planId=${req.body.id}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });

      res.status(RECEIVED).json({
        success: true,
        data: session,
        message: activeSubscriptionControllerMessages.checkoutSessionCreated,
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

  static async create(req, res) {
    try {
      const { planId } = req.body;
      const userId = req.user.id;

      const existingActiveSubscription = await ActiveSubscription.findOne({ userId, planId });

      if (existingActiveSubscription) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: activeSubscriptionControllerMessages.alreadyExists,
          statusCode: BAD_REQUEST,
        });
      }

      const activeSubscription = await ActiveSubscription.create({
        userId,
        planId,
        expireDate: moment().add(1, 'month').toDate(),
      });

      res.status(CREATED).json({
        success: true,
        data: activeSubscription,
        message: activeSubscriptionControllerMessages.created,
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

  static async getCurrentActiveSubscription(req, res) {
    try {
      const userId = req.user.id;

      // TODO: add validation for user existence

      const activeSubscription = await ActiveSubscription.findOne({ userId });

      if (!activeSubscription) {
        return res.status(NOT_FOUND).json({
          success: false,
          message: activeSubscriptionControllerMessages.notFound,
          statusCode: NOT_FOUND,
        });
      }

      res.status(RECEIVED).json({
        success: true,
        data: activeSubscription,
        message: activeSubscriptionControllerMessages.received,
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

export default ActiveSubscriptionController;