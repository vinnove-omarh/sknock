import './LoadEnv'; // Must be the first import
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import { handleError } from '@helpers/ErrorHandler'
import ErrorHandler from '@helpers/ErrorHandler/index';

// Init express
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add APIs
app.use('/api/v1', BaseRouter);

// Print API errors
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  handleError(err, res);
});

// Db connection
mongoose
  .connect('mongodb://localhost/sknock', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
      logger.info('Express server started on port: ' + port);
    });
  })
  .catch(() => logger.info('database connection failed'));

// Export express instance
export default app;
