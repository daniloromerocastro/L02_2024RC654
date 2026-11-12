import { Router } from 'express';
import * as controller from '../controllers/pedidosController.js';
import { orderValidators, runValidations } from '../middlewares/validators.js';

const router = Router();

// 1. Rutas específicas
router.get('/cliente/:id_usuario', controller.getPedidosCliente);

// 2. CRUD
router.get('/', controller.getPedidos);
router.post('/', runValidations(orderValidators), controller.postPedido);
router.put('/:id', runValidations(orderValidators), controller.putPedido);
router.delete('/:id', controller.deletePedido);

// 3. Rutas dinámicas
router.get('/:id', controller.getPedidoById);

export default router;