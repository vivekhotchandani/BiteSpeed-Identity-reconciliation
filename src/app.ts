import express, { RequestHandler } from 'express';
import identifyRouter from './routes/identify';

const app = express();
app.use(express.json() as RequestHandler);
app.use('/', identifyRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Identify service listening on port ${PORT}`);
});

export default app;
