import express from 'express';
import userAuthentification from './routes/user_authentification';

const app = express();

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userAuthentification);
app.listen(port, () => {
  console.log(`exemple app listenning at ${port}`);
});
