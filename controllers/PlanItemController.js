import Controller from './Controller.js';

import PlanItem from '../models/PlanItem.js';

import {
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
  RECEIVED,
  somethingWentWrong,
  planItemControllerMessages,
} from '../constants/index.js';

class PlanItemController extends Controller {
  static async create(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: planItemControllerMessages.nameRequired,
          statusCode: BAD_REQUEST,
        });
      }

      const existingPlanItem = await PlanItem.findOne({ name });

      if (existingPlanItem) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: planItemControllerMessages.alreadyExists,
          statusCode: BAD_REQUEST,
        });
      }

      const planItem = await PlanItem.create({ name });

      res.status(CREATED).json({
        success: true,
        data: planItem,
        message: planItemControllerMessages.created,
        statusCode: CREATED,
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

  static async getAll(req, res) {
    try {
      const planItems = await PlanItem.find();

      res.status(RECEIVED).json({
        success: true,
        data: planItems,
        message: planItemControllerMessages.received,
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

      const planItem = await PlanItem.findById(id);

      res.status(RECEIVED).json({
        success: true,
        data: planItem,
        message: planItemControllerMessages.receivedOne,
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

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: planItemControllerMessages.nameRequired,
          statusCode: BAD_REQUEST,
        });
      }

      const planItem = await PlanItem.findByIdAndUpdate(id, { name });

      res.status(RECEIVED).json({
        success: true,
        data: { ...planItem._doc, name },
        message: planItemControllerMessages.updated,
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

  static async delete(req, res) {
    try {
      const { id } = req.params;

      await PlanItem.findByIdAndDelete(id);

      res.status(RECEIVED).json({
        success: true,
        data: {
          id,
        },
        message: planItemControllerMessages.deleted,
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

export default PlanItemController;