import { Response, NextFunction } from 'express';

class SuccessHandler {
  public status: string;
  public statusCode: number;
  public message: string;
  public res: Response;
  public next: NextFunction;
  public data: any;

  constructor(statusCode: number, message: string, res: Response, next: NextFunction, data: any) {
    this.status = 'success';
    this.statusCode = statusCode;
    this.message = message;
    this.res = res;
    this.next = next;
    this.data = data ? data : null;
  }

  public handleSuccess() {
    const status = this.status;
    const statusCode: number = this.statusCode;
    const message: string = this.message;
    const res: Response = this.res;
    const data: any = this.data;
    res.status(statusCode).send({
      status,
      statusCode,
      message,
      data
    });
  }
}

export default SuccessHandler;
