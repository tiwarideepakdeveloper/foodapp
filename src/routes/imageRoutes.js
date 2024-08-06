import express from "express";
import { showImage } from "../controller/imageController.js";

const imageRoute = express.Router();

imageRoute.get('/show/:type/:recordId', showImage);

export default imageRoute;