import cors from 'cors';
import express from 'express';
import CartRouter from './routes/cart.routes';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CART_CORS_ALLOWED_ORIGIN,
  }),
);

app.use('/cart', CartRouter);

app.listen(8005, () => {
  console.log('Cart service OK');
});
