import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3101;
export const server = app.listen(PORT, () => {
  console.log(`Category-service is running on port ${PORT}`);
});
