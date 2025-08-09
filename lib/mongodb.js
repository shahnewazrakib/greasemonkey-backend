import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
      dbName: process.env.MONGODB_DATABASE_NAME,
    };

    // Establish a new connection if not already connected
    await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING,
      clientOptions
    );

    // Verify connection with a ping
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error");
    process.exit(1);
  }
}
