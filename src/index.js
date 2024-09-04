import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';

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
import homeRoute from "./routes/homeRoutes.js";

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/src/assets/'));
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(appData);

app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfull.");
    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(error);
});

app.use("/", appData, homeRoute);
app.use("/auth", appData, authRoute);
app.use("/user", appData, userRoute);
app.use("/image", appData, imageRoute);
app.use("/setting", appData, settingRoute);
app.use("/role", appData, rolesRoute);
app.use("/category", appData, categoryRoute);
app.use("/brand", appData, brandRoute);
app.use("/product-option", appData, productOptionRoute);
app.use("/manage-product", appData, manageProductRoute);
app.use("/manage-product-item", appData, manageProductItemRoute);