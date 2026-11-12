import { Router } from 'express';
import * as controller from '../controllers/productosController.js';
import { productValidators, runValidations } from '../middlewares/validators.js';

const router = Router();

// 1. Rutas específicas (Top N)
router.get('/top/:n', controller.getTopN);

// 2. CRUD
router.get('/', controller.getProductos);
router.post('/', runValidations(productValidators), controller.postProducto);
router.put('/:id', runValidations(productValidators), controller.putProducto);
router.delete('/:id', controller.deleteProducto);

// 3. Rutas dinámicas
router.get('/:id', controller.getProductoById);

export default router;