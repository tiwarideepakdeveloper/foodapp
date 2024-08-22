import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from '../controller/categoryController.js';

const categoryRoute = express.Router();

categoryRoute.get('/', [auth, checkPermission('product_view')], fetchRecords);
categoryRoute.get('/:id', [auth, checkPermission('product_view')], fetchRecord);
categoryRoute.post('/', [auth, checkPermission('product_create')], saveRecord);
categoryRoute.put('/:id', [auth, checkPermission('product_update')], updateRecord);
categoryRoute.delete('/:id', [auth, checkPermission('product_delete')], deleteRecord);

export default categoryRoute;