// import mongoose from "mongoose"

// const connection = {};

// export const connectToDb = async () => {
//   try {
//     if(connection.isConnected) {
//       console.log("Using existing connection");
//       return;
//     }
//     const db = await mongoose.connect(process.env.MONGO);
//     connection.isConnected = db.connections[0].readyState;
//   } catch (error) {
//     console.log(error);
//     // throw new Error(error);
//   }
// };

import mongoose from "mongoose";
const MONGO = "mongodb+srv://aminur1514010:ERmHiKxHUN6B4lL4@cluster0.5lnjt.mongodb.net/anti?retryWrites=true&w=majority&appName=Cluster0"


export const connectToDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Database already connected");
    return; // Connection is already established
  }

  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Failed to connect to database:", err);
    throw new Error("Database connection error!");
  }
};
