import express from 'express';
import { fetchRecords, updateRecord, deleteRecord, saveRecord } from '../controller/userController.js';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { validate } from '../middleware/validate.js';
import { updateSchema, createSchema } from '../validations/userValidation.js';

const userRoute = express.Router();

userRoute.get('/:page?', [auth, checkPermission('user_view')], fetchRecords);
userRoute.post('/', [auth, checkPermission('user_create'), validate(updateSchema)], saveRecord);
userRoute.put('/:userId', [auth, validate(createSchema), checkPermission('user_update')], updateRecord);
userRoute.delete('/:userId', [auth, checkPermission('user_delete')], deleteRecord);

export default userRoute;