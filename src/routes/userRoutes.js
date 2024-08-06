import express from 'express';
import { fetchAll } from '../controller/userController.js';
import { auth } from '../middleware/authMiddleware.js';

const userRoute = express.Router();

userRoute.get('/', auth, fetchAll);
userRoute.put('/:id/update', auth, fetchAll);
userRoute.delete('/:id/delete', auth, fetchAll);

export default userRoute;