import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import imageRoute from "./routes/imageRoutes.js";
import settingRoute from "./routes/settingRoutes.js";

const app = express();

app.use(bodyParser.json());
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfull.");
    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(error);
});

// Auth Routes
app.use("/api/auth", authRoute);

// User Manage Route
app.use("/api/user", userRoute);

// Image Manage Route
app.use("/api/image", imageRoute);


// Image Manage Route
app.use("/api/setting", settingRoute);
