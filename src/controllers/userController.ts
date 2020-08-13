import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';

import ErrorHandler, { handleError } from '@helpers/ErrorHandler';
import SuccessHandler from '@helpers/SuccessHandler';
import UserService from '@services/UserService';
import { IUser } from '@models/user';
import logger from '@shared/Logger';

interface IRequest extends Request {
  [key : string] : any;
}

const omitKeys = ['createdAt', 'updatedAt'];

export const getAllUsers = async (req: IRequest, res: Response, next: NextFunction) => {
  let criteria = {};
  if (Object.keys(req.query).length > 0) {
    criteria = {
      status: req.query.status
    };
  }

  try {
    const data = await new UserService().findAllUsers(criteria);
    new SuccessHandler(200, 'User list', res, next, data).handleSuccess();
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const criteria = {
    _id: id,
  };

  try {
    const data = await new UserService().findUser(criteria);
    new SuccessHandler(200, 'User fetch', res, next, omit(data, omitKeys)).handleSuccess();
  } catch(error) {
    logger.info('ERROR: controller -> getUser', error);
    next(error);
  }
};

export const createUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const user: IUser = req.body as unknown as IUser;
  try {
    const data = await new UserService().createUser(user);
    new SuccessHandler(200, 'User created', res, next, omit(data, omitKeys)).handleSuccess();
  } catch(error) {
    next(new ErrorHandler(500, error));
  }
};

export const updateUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const update = req.body;
  const { id } = req.params;
  const criteria = {
    _id: id,
  };

  try {
    const data = await new UserService().updateUser(criteria, update);
    new SuccessHandler(200, 'User updated', res, next, omit(data, omitKeys)).handleSuccess();
  } catch (error) {
    logger.info('ERROR: controller -> updateUser', error);
    next(error);
  }
};

export const deleteUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const criteria = {
    _id: id
  };

  try {
    const data = await new UserService().deleteUser(criteria);
    if (!data) {
      throw new ErrorHandler(404, 'Object_NOT_FOUND');
    } else {
      new SuccessHandler(200, 'User deleted', res, next, omit(data, omitKeys)).handleSuccess();
    }
  } catch (error) {
    logger.info('ERROR: controller -> deleteUser', error);
    next(error);
  }
};
