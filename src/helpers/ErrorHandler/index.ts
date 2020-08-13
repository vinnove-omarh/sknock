import { Response } from 'express';

class ErrorHandler extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { message } = err;
  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json(
    {
      status: 'error',
      statusCode,
      message
    }
  );
};

export default ErrorHandler;
