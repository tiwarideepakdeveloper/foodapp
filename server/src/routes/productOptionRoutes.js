import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from '../controller/productOptionController.js';
import { validate } from '../middleware/validate.js';
import { productOptionSchema } from '../validations/productOptionValidation.js';

const productOptionRoute = express.Router();

productOptionRoute.get('/:type/:page?', [auth, checkPermission('product_view')], fetchRecords);
productOptionRoute.get('/:type/view/:id', [auth, checkPermission('product_view')], fetchRecord);
productOptionRoute.post('/:type', [auth, checkPermission('product_create'), validate(productOptionSchema)], saveRecord);
productOptionRoute.put('/:type/:id', [auth, checkPermission('product_update'), validate(productOptionSchema)], updateRecord);
productOptionRoute.delete('/:type/:id', [auth, checkPermission('product_delete')], deleteRecord);

export default productOptionRoute;