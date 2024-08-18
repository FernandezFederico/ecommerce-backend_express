import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {});
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export { connectDB };
