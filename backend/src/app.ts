import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { envVars } from './configs/envConfig';
import userRoutes from './routes/userRoutes';
import followRoutes from './routes/followRoutes';
import postRoutes from './routes/postRoutes';

import globalErrorHandler from './controllers/errorController';
import { authenticateUser } from './middlewares/authenticateUser';
import { rateLimit } from './middlewares/rateLimit';

const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: envVars.ORIGIN,
    credentials: true,
  })
);

app.use('/api', rateLimit);

app.use('/api/v1/users', userRoutes);

app.use(authenticateUser);
app.use('/api/v1/follow', followRoutes);
app.use('/api/v1/post', postRoutes);

app.get('/test', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to the instaphoto API' });
});

// Global errors handler
app.use(globalErrorHandler);

export default app;
