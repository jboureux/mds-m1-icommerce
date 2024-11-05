import express from 'express';
import dotenv from 'dotenv';
import CategoryRoute from './routes/category.route';

dotenv.config({ path: '../../.env' });

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/category', CategoryRoute);

const PORT = process.env.PORT || 8004;
export const server = app.listen(PORT, () => {
  console.log(`Category-service is running on port ${PORT}`);
});
