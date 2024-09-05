import express from "express";
import { index } from "../controller/dashboardController.js";

const dashboardRoute = express.Router();

dashboardRoute.get('/', index);
export default dashboardRoute;