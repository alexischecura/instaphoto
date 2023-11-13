import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    const { statusCode, status, message, code, description, fields } = error;

    // Send status code and error message to the client
    const respJson = {
      status,
      code,
      message,
      description,
      fields,
    };
    res.status(statusCode).json(respJson);
  } else {
    // Unknown errors
    console.error('Unknown error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

export default globalErrorHandler;
