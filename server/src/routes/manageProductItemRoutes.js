import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from '../controller/manageProductItemController.js';

const manageProductItemRoute = express.Router();

manageProductItemRoute.get('/:page?', [auth, checkPermission('product_view')], fetchRecords);
manageProductItemRoute.get('/view/:id', [auth, checkPermission('product_view')], fetchRecord);
manageProductItemRoute.post('', [auth, checkPermission('product_create')], saveRecord);
manageProductItemRoute.put('/:id', [auth, checkPermission('product_update')], updateRecord);
manageProductItemRoute.delete('/:id', [auth, checkPermission('product_delete')], deleteRecord);

export default manageProductItemRoute;