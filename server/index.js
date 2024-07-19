/* IMPORTS */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "dotenv/config";
//**LOGGER IMPORTS */
import { reqResLog } from "./middleware/requestResponseHandler.js";
import { errorLog } from "./middleware/errorHandler.js";
//**DATABASE IMPORTS */
import { connectDB } from "./controllers/connectDB.js";
//** ROUTES IMPORTS */
import authRoutes from "./routes/auth.js";

/* CONFIG */

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

/** CUSTOM LOGGER */
app.use(reqResLog);
app.use(errorLog);

/** ROUTES */
app.use("/auth",authRoutes);

//** SERVER */
const PORT = process.env.PORT;
const server = async () => {
  await connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT ${PORT}`);
    });
  });
};
server();
