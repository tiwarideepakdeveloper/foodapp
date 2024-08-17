import express from 'express';
import { fetchRecords, saveRecord, updateRecord, deleteRecord } from '../controller/roleController.js';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';

const rolesRoute = express.Router();

rolesRoute.get('/:page?', [auth, checkPermission('role_view')], fetchRecords);
rolesRoute.post('/', [auth, checkPermission('role_create')], saveRecord);
rolesRoute.put('/:roleId', [auth, checkPermission('role_update')], updateRecord);
rolesRoute.delete('/:roleId', [auth, checkPermission('role_delete')], deleteRecord);

export default rolesRoute;