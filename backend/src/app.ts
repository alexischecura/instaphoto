import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { envVars } from './configs/envConfig';
import userRoutes from './routes/userRoutes';
import followRoutes from './routes/followRoutes';
import postRoutes from './routes/postRoutes';

import globalErrorHandler from './controllers/errorController';
import { authenticateUser } from './middlewares/authenticateUser';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: envVars.ORIGIN,
    credentials: true,
  })
);

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 500);
});

app.use('/api/v1/users', userRoutes);

app.use(authenticateUser);
app.use('/api/v1/follow', followRoutes);
app.use('/api/v1/post', postRoutes);

app.get('/test', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to the instagram-clone API' });
});

// Global errors handler
app.use(globalErrorHandler);

export default app;
