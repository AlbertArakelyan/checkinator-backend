import Controller from './Controller.js';

import Plan from '../models/Plan.js';

import {
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
  RECEIVED,
  somethingWentWrong,
  planControllerMessages,
} from '../constants/index.js';

class PlanController extends Controller {
  static async create(req, res) {
    try {
      const { name, price, planItems, color } = req.body;

      if (!name || !price || !planItems?.length) {
        let errorCounter = 0;
        let errorMessage = 'Please provide';

        if (!name) {
          errorMessage += ' Name';
          errorCounter++;
        }

        if (!price) {
          errorMessage += ' Price';
          errorCounter++;
        }

        if (!planItems?.length) {
          errorMessage += ' Plan Items';
          errorCounter++;
        }

        if (errorCounter > 1) {
          errorMessage += ' fields';
        } else {
          errorMessage += ' field';
        }

        return res.status(BAD_REQUEST).json({
          success: false,
          message: errorMessage,
          statusCode: BAD_REQUEST,
        });
      }

      const existingPlan = await Plan.findOne({ name });

      if (existingPlan) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: planControllerMessages.alreadyExists,
          statusCode: BAD_REQUEST,
        });
      }

      let plan = await Plan.create({ name, price, planItems, color });
      plan = await plan.populate('planItems');

      res.status(CREATED).json({
        success: true,
        data: plan, // TODO: send already updated data
        message: planControllerMessages.created,
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

  static async getAll(req, res) {
    try {
      const plans = await Plan.find().populate('planItems');

      res.status(RECEIVED).json({
        success: true,
        data: plans,
        message: planControllerMessages.received,
        statusCode: RECEIVED,
      })
    } catch (error) {
      super.catchError(error);
      res.status(SERVER_ERROR).json({
        success: false,
        message: error.message || somethingWentWrong,
        statusCode: SERVER_ERROR,
      });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;

      const plan = await Plan.findById(id).populate('planItems');

      res.status(RECEIVED).json({
        success: true,
        data: plan,
        message: planControllerMessages.receivedOne,
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

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, planItems, color } = req.body;

      let plan = await Plan.findByIdAndUpdate(id, { name, price, planItems, color });
      plan = await plan.populate('planItems');

      res.status(RECEIVED).json({
        success: true,
        data: plan,
        message: planControllerMessages.updated,
        statusCode: RECEIVED
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

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const plan = await Plan.findByIdAndDelete(id);

      if (!plan) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: planControllerMessages.notFound,
          statusCode: BAD_REQUEST,
        });
      }

      res.status(RECEIVED).json({
        success: true,
        data: {
          id,
        },
        message: planControllerMessages.deleted,
        statusCode: RECEIVED
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

export default PlanController;