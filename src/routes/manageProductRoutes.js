import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from '../controller/manageProductController.js';

const manageProductRoute = express.Router();

manageProductRoute.get('/', [auth, checkPermission('product_view')], fetchRecords);
manageProductRoute.get('/:id', [auth, checkPermission('product_view')], fetchRecord);
manageProductRoute.post('/', [auth, checkPermission('product_create')], saveRecord);
manageProductRoute.put('/:id', [auth, checkPermission('product_update')], updateRecord);
manageProductRoute.delete('/:id', [auth, checkPermission('product_delete')], deleteRecord);

export default manageProductRoute;