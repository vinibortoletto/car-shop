import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import router from './Routes/carsRoute';

const app = express();
app.use(express.json());
app.use(router);
app.use(ErrorHandler.handle);

export default app;
