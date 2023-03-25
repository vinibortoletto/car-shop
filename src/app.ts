import express from 'express';
import { ErrorHandler } from './Middlewares';
import { carRouter, motorcycleRouter } from './Routers';

const app = express();
app.use(express.json());

app.use('/cars', carRouter);
app.use('/motorcycles', motorcycleRouter);
app.use(ErrorHandler.handle);

export default app;
