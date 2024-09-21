import express from 'express';
import expressEjsLayouts from "express-ejs-layouts";
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { validate } from '../middleware/validate.js';
import { index, create, deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from '../controller/brandController.js';
import { createSchema, updateSchema } from '../validations/brandValidation.js';

const brandRoute = express.Router();
brandRoute.use(expressEjsLayouts);

brandRoute.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'partials/layout');
    next();
});

brandRoute.get('/create', [auth, checkPermission('product_create')], create);
brandRoute.get('/:page?', [auth, checkPermission('product_view')], index);
brandRoute.get('/view/:id', [auth, checkPermission('product_view')], fetchRecord);
brandRoute.post('/', [auth, checkPermission('product_create'), validate(createSchema)], saveRecord);
brandRoute.put('/:id', [auth, checkPermission('product_update'), validate(updateSchema)], updateRecord);
brandRoute.delete('/:id', [auth, checkPermission('product_delete')], deleteRecord);

export default brandRoute;