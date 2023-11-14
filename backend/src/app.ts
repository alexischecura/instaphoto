import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { envVars } from './configs/envConfig';
import userRoutes from './routes/userRoutes';
import globalErrorHandler from './controllers/errorController';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: envVars.ORIGIN,
    credentials: true,
  })
);

app.use('/api/v1/users', userRoutes);

app.get('/test', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to the instagram-clone API' });
});

// Global errors handler
app.use(globalErrorHandler);

export default app;
