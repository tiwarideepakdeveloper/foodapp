import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import imageRoute from "./routes/imageRoutes.js";
import settingRoute from "./routes/settingRoutes.js";
import rolesRoute from "./routes/roleRoutes.js";
import { appData } from "./middleware/appMiddleware.js";

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

app.use("/api/auth", appData, authRoute);
app.use("/api/user", appData, userRoute);
app.use("/api/image", appData, imageRoute);
app.use("/api/setting", appData, settingRoute);
app.use("/api/role", appData, rolesRoute);