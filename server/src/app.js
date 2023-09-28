import express from "express";
import ose from 'mongoose'
import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT } from "./utils/constants.js";
import cors from 'cors';
import AuthMiddleware from "./middlewares/AuthMiddleware.js";

const app = express();
const PORT = 8000;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};
app.use(cors())
app.use(express.json());
app.use('/api/', apiRoute)
app.use('/api/',AuthMiddleware ,apiProtected)


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})

