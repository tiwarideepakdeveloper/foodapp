import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import MongoStore from 'connect-mongo';

import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import imageRoute from "./routes/imageRoutes.js";
import settingRoute from "./routes/settingRoutes.js";
import rolesRoute from "./routes/roleRoutes.js";
import { appData, homePageData } from "./middleware/appMiddleware.js";
import categoryRoute from "./routes/categoryRoutes.js";
import brandRoute from "./routes/brandRoutes.js";
import productOptionRoute from "./routes/productOptionRoutes.js";
import manageProductRoute from "./routes/manageProductRoutes.js";
import manageProductItemRoute from "./routes/manageProductItemRoutes.js";
import homeRoute from "./routes/homeRoutes.js";
import dashboardRoute from "./routes/dashboardRoutes.js";


const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected successfull.");
    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(error);
});

// Create a MongoStore instance
const mongoStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions'
});

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/assets/'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(appData);

app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');




app.use("/", [appData, homePageData], homeRoute);
app.use("/auth", appData, authRoute);
app.use("/image", appData, imageRoute);
app.use("/setting", appData, settingRoute);

app.use("/dashboard", appData, dashboardRoute);
app.use("/dashboard/user", appData, userRoute);
app.use("/dashboard/role", appData, rolesRoute);
app.use("/dashboard/category", appData, categoryRoute);
app.use("/dashboard/brand", appData, brandRoute);
app.use("/dashboard/product-option", appData, productOptionRoute);
app.use("/dashboard/manage-product", appData, manageProductRoute);
app.use("/dashboard/manage-product-item", appData, manageProductItemRoute);