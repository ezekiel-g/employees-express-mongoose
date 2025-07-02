import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase, disconnectFromDatabase } from './api/v1/db/db.js';
import createCrudRouter from './api/v1/factories/createCrudRouter.js';
import Department from './api/v1/models/Department.js';
import Employee from './api/v1/models/Employee.js';

dotenv.config();

const app = express();
const connectedToDatabase = await connectToDatabase();
const { PORT } = process.env;
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};

if (connectedToDatabase) {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use('/api/v1/departments', createCrudRouter(Department));
  app.use('/api/v1/employees', createCrudRouter(Employee));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    disconnectFromDatabase();
    process.exit(0);
  });
}
