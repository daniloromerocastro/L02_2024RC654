import { Router } from 'express';
import * as controller from '../controllers/detallesController.js';
import { detailValidators, runValidations } from '../middlewares/validators.js';

const router = Router();

// 1. Rutas específicas
router.get('/pedido/:id_pedido', controller.getPorPedido);
router.get('/producto/:id_producto', controller.getPorProducto);

// 2. CRUD
router.get('/', controller.getDetalles);
router.post('/', runValidations(detailValidators), controller.postDetalle);
router.put('/:id', runValidations(detailValidators), controller.putDetalle);
router.delete('/:id', controller.deleteDetalle);

// 3. Rutas dinámicas
router.get('/:id', controller.getDetalleById);

export default router;