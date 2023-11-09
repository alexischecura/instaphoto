import express from 'express';

const app = express();

app.use(express.json({ limit: '10kb' }));

app.get('/test', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to the instagram-clone API' });
});

export default app;
