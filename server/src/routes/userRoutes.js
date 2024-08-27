import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { validate } from '../middleware/validate.js';
import { updateSchema, createSchema } from '../validations/userValidation.js';
import { fetchRecords, updateRecord, deleteRecord, saveRecord } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.get('/:page?', [auth, checkPermission('user_view')], fetchRecords);
userRoute.post('/', [auth, checkPermission('user_create'), validate(createSchema)], saveRecord);
userRoute.put('/:userId', [auth, checkPermission('user_update'), validate(updateSchema)], updateRecord);
userRoute.delete('/:userId', [auth, checkPermission('user_delete')], deleteRecord);

export default userRoute;