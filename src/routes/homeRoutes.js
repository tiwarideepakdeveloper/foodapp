import express from "express";
import { index } from "../controller/homeController.js";

const homeRoute = express.Router();

homeRoute.get('/', index);
export default homeRoute;