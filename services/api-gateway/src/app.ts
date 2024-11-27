import express from 'express';
import userAuthentification from './routes/user_authentification';
import CategoryRoute from './routes/category.route';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const app = express();
app.disable('x-powered-by');
const port = 8000;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'I-Commerce API',
      version: '1.0.0',
      description:
        'API for managing all the entities in the I-Commerce microservice project',
    },
  },

  apis: [
    path.join(__dirname, './swagger/main.yaml'),
    path.join(__dirname, './swagger/*.yaml'),
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/user', userAuthentification);
app.use('/category', CategoryRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
