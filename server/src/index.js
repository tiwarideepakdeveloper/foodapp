import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import imageRoute from "./routes/imageRoutes.js";
import settingRoute from "./routes/settingRoutes.js";
import rolesRoute from "./routes/roleRoutes.js";
import { appData } from "./middleware/appMiddleware.js";
import categoryRoute from "./routes/categoryRoutes.js";
import brandRoute from "./routes/brandRoutes.js";
import productOptionRoute from "./routes/productOptionRoutes.js";
import manageProductRoute from "./routes/manageProductRoutes.js";
import manageProductItemRoute from "./routes/manageProductItemRoutes.js";

const app = express();

let corsOptions = {
    origin : ['http://localhost:5173'],
}

app.use(cors(corsOptions))

app.use(bodyParser.json());
dotenv.config();

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
app.use("/api/category", appData, categoryRoute);
app.use("/api/brand", appData, brandRoute);
app.use("/api/product-option", appData, productOptionRoute);
app.use("/api/manage-product", appData, manageProductRoute);
app.use("/api/manage-product-item", appData, manageProductItemRoute);