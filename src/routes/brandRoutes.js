import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from '../controller/brandController.js';

const brandRoute = express.Router();

brandRoute.get('/', [auth, checkPermission('product_view')], fetchRecords);
brandRoute.get('/:id', [auth, checkPermission('product_view')], fetchRecord);
brandRoute.post('/', [auth, checkPermission('product_create')], saveRecord);
brandRoute.put('/:id', [auth, checkPermission('product_update')], updateRecord);
brandRoute.delete('/:id', [auth, checkPermission('product_delete')], deleteRecord);

export default brandRoute;