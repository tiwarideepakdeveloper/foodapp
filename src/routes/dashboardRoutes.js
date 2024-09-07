import express from "express";
import { index } from "../controller/dashboardController.js";
import { auth } from "../middleware/authMiddleware.js";

const dashboardRoute = express.Router();

dashboardRoute.get('/', auth, index);
export default dashboardRoute;