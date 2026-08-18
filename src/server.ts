import mongoose, { MongooseError } from "mongoose";
import app from "./app";
import env from "./config/env.config";

async function bootstrapApplication() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Database is connected");
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log("[Mongoose Connection Error] : ", error.message);
    } else {
      console.log("[Internal Server Error] : ", error);
    }
    process.exit(1);
  }
}

bootstrapApplication();
