import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3101;
export const server = app.listen(PORT, () => {
  console.log(`User-service is running on port ${PORT}`);
});
