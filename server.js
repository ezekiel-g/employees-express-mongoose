import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './api/v1/db/dbConnection.js';
import createCrudRouter from './api/v1/factories/createCrudRouter.js';
import Department from './api/v1/models/Department.js';
import Employee from './api/v1/models/Employee.js';

dotenv.config();

const app = express();
const { PORT } = process.env;
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/v1/departments', createCrudRouter(Department));
app.use('/api/v1/employees', createCrudRouter(Employee));

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();
