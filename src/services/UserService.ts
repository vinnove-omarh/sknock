import UserDao from '@daos/UserDao';
import logger from '@shared/Logger';
import { IUser } from '@models/user';

class UserService {

  public async findAllUsers(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await new UserDao().findAllUsers(criteria, projection, options);
    } catch (error) {
      logger.info('TCL: findAllUsers -> e', error.message);
    }
  }

  public async findUser(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await new UserDao().findUser(criteria, projection, options);
    } catch (error) {
      logger.error('TCL: findUser -> e', error);
      throw error;
    }
  }

  public async createUser(user: IUser) {
    try {
      return await new UserDao().createUser(user);
    } catch (error) {
      logger.info('TCL: createUserSvc -> e', error);
      throw error;
    }
  }

  public async updateUser(criteria: any, dataToUpdate: any = {}, options: any = {}) {
    try {
      return await new UserDao().updateUser(criteria, dataToUpdate, options);
    } catch (error) {
      logger.info('TCL: updateUser -> e', error);
      throw error;
    }
  }

  public async deleteUser(criteria: any) {
    try {
      return await new UserDao().deleteUser(criteria);
    } catch (error) {
      logger.info('TCL: deleteUser -> e', error);
      throw error;
    }
  }
}

export default UserService;