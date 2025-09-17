import express from 'express';
import router from './router/index';

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.disable('etag');
app.use(express.json());
app.use(router);

export default app;