import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase, disconnectFromDatabase } from './api/v1/db/db.js';
import crudEndpoints from './api/v1/endpoints/crudEndpoints.js';
import Department from './api/v1/models/Department.js';
import Employee from './api/v1/models/Employee.js';

dotenv.config();

const connectedToDatabase = await connectToDatabase();

if (!connectedToDatabase) process.exit(1);

const app = express();
const { PORT } = process.env;
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/v1/departments', crudEndpoints(Department));
app.use('/api/v1/employees', crudEndpoints(Employee));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  disconnectFromDatabase();
  process.exit(0);
});
