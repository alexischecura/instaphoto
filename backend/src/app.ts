import express from 'express';
import userRoutes from './routes/userRoutes';
import globalErrorHandler from './controllers/errorController';

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', userRoutes);

app.get('/test', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to the instagram-clone API' });
});

// Global errors handler
app.use(globalErrorHandler);

export default app;
