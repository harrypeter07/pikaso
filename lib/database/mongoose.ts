import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

// Define the MongooseConnection interface more precisely
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use a more robust way to check for the cached connection on the global object
let cached: MongooseConnection | null = (global as any).mongoose; // Initialize as null

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached?.conn) { // Optional chaining for null check
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error('Missing MONGODB_URL');
  }

  // Use a try-catch block to handle connection errors and reset the cached promise
  try {
      cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
          dbName: 'imaginify',
          bufferCommands: false, // Recommended for production
          autoIndex: true, // Recommended for production - builds indexes automatically
      });

      cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise on error
    throw error; // Re-throw the error to be handled by the caller
  }
  

  return cached.conn;
};