import mongoose from 'mongoose';

const connectToDatabase = async () => {
  let connected = false;

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB');
    connected = true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }

  return connected;
};

const disconnectFromDatabase = () => {
  mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

export { connectToDatabase, disconnectFromDatabase };
