import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import { carRouter, motorcycleRouter } from './Routers';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);
app.use(ErrorHandler.handle);

export default app;
