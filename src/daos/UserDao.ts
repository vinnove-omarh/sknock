import UserModel, { IUser } from '@models/user';
import ErrorHandler from '@helpers/ErrorHandler/index';
import logger from '@shared/Logger';

class UserDao {

  public async findAllUsers(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await UserModel.find(criteria, projection, options);
    } catch (error) {
      logger.info('TCL: findAllUser -> error', error);
      throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
    }
  }

  public async findUser(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await UserModel.findOne(criteria, projection, options);
    } catch (error) {
      logger.info('TCL: findUser -> error', error);
      throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
    }
  }

  public async createUser(user : IUser) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      logger.info(error)
      throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
  }

  public async updateUser(criteria: any, dataToUpdate: any = {}, options: any = {}) {
    try {
      const record = await UserModel.findOneAndUpdate(criteria, dataToUpdate, options);
      if (!record) throw new ErrorHandler(404, 'Object_NOT_FOUND');
      return record;
    } catch (error) {
      throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
    }
  }

  public async deleteUser(criteria: any) {
    try {
      const dataToUpdate = {
        status: false
      };
      const record = await UserModel.findOneAndUpdate(criteria, dataToUpdate);
      if (!record) throw new ErrorHandler(404, 'Object_NOT_FOUND');
      return record;
    } catch (error) {
      throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
    }
  }
}

export default UserDao;
