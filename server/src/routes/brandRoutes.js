import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { validate } from '../middleware/validate.js';
import { deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from '../controller/brandController.js';
import { createSchema, updateSchema } from '../validations/brandValidation.js';

const brandRoute = express.Router();

brandRoute.get('/:page?', [auth, checkPermission('product_view')], fetchRecords);
brandRoute.get('/view/:id', [auth, checkPermission('product_view')], fetchRecord);
brandRoute.post('/', [auth, checkPermission('product_create'), validate(createSchema)], saveRecord);
brandRoute.put('/:id', [auth, checkPermission('product_update'), validate(updateSchema)], updateRecord);
brandRoute.delete('/:id', [auth, checkPermission('product_delete')], deleteRecord);

export default brandRoute;