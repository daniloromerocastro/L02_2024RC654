import { Router } from 'express';
import * as controller from '../controllers/usuariosController.js';
import { userValidators, runValidations } from '../middlewares/validators.js';

const router = Router();

// 1. Rutas específicas (Filtros)
router.get('/filtro/nombre/:nombre', controller.filtroNombre);
router.get('/filtro/apellido/:apellido', controller.filtroApellido);
router.get('/filtro/correo/:correo', controller.filtroCorreo);

// 2. CRUD (Menos la búsqueda por ID)
router.get('/', controller.getUsuarios);
router.post('/', runValidations(userValidators), controller.postUsuario);
router.put('/:id', runValidations(userValidators), controller.putUsuario);
router.delete('/:id', controller.deleteUsuario);

// 3. Rutas dinámicas (Al final)
router.get('/:id', controller.getUsuarioById);

export default router;