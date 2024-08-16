import express from 'express';
import { getData, setup } from '../controller/roleController.js';

const rolesRoute = express.Router();

rolesRoute.get('/', getData);
rolesRoute.post('/setup', setup);

export default rolesRoute;