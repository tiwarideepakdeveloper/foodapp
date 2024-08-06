import express from "express";
import { getDataByPageType } from "../controller/settingController.js";

const settingRoute = express.Router();

settingRoute.get('/page/:page', getDataByPageType);

export default settingRoute;