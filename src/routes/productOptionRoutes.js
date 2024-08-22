import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/rbacMiddleware.js';
import { deleteRecordOfSize, fetchRecordOfSize, fetchRecordsOfSize, saveRecordOfSize, updateRecordOfSize, deleteRecordOfColour, fetchRecordOfColour, fetchRecordsOfColour, saveRecordOfColour, updateRecordOfColour } from '../controller/productOptionController.js';

const productOptionRoute = express.Router();

productOptionRoute.get('/size', [auth, checkPermission('product_view')], fetchRecordsOfSize);
productOptionRoute.get('/size/:id', [auth, checkPermission('product_view')], fetchRecordOfSize);
productOptionRoute.post('/size', [auth, checkPermission('product_create')], saveRecordOfSize);
productOptionRoute.put('/size/:id', [auth, checkPermission('product_update')], updateRecordOfSize);
productOptionRoute.delete('/size/:id', [auth, checkPermission('product_delete')], deleteRecordOfSize);

productOptionRoute.get('/colour', [auth, checkPermission('product_view')], fetchRecordsOfColour);
productOptionRoute.get('/colour/:id', [auth, checkPermission('product_view')], fetchRecordOfColour);
productOptionRoute.post('/colour', [auth, checkPermission('product_create')], saveRecordOfColour);
productOptionRoute.put('/colour/:id', [auth, checkPermission('product_update')], updateRecordOfColour);
productOptionRoute.delete('/colour/:id', [auth, checkPermission('product_delete')], deleteRecordOfColour);

export default productOptionRoute;