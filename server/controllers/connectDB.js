/**IMPORTS */
import mongoose from "mongoose";

/**MONGOOSE CONFIG */
const mongoURI = process.env.MONGO_URI;
export const connectDB = () => {
 return mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
