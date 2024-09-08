import express from "express";
import { index, logout } from "../controller/dashboardController.js";
import { auth } from "../middleware/authMiddleware.js";

const dashboardRoute = express.Router();

dashboardRoute.get('/', auth, index);
dashboardRoute.get('/logout', auth, logout);

export default dashboardRoute;