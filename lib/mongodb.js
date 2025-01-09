
import mongoose from "mongoose";

const uri = 'mongodb+srv://uic19mca8112:uic19mca8112@cluster0.0iy63mz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' || process.env.MONGODB_URI ;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}
const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
