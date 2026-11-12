import { body, validationResult } from 'express-validator';

export const runValidations = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();

        res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    };
};

// Validaciones para Usuarios
export const userValidators = [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').trim().notEmpty().withMessage('El apellido es obligatorio'),
    body('correo').trim().isEmail().withMessage('El correo no es válido')
];

// Validaciones para Productos
export const productValidators = [
    body('nombre_producto').trim().notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('precio').isNumeric().withMessage('El precio debe ser un número mayor a 0')
];

// Validaciones para Pedidos
export const orderValidators = [
    body('id_usuario').isUUID().withMessage('ID de usuario inválido'),
    body('total').isNumeric().withMessage('El total debe ser un número')
];

// Validaciones para Detalles
export const detailValidators = [
    body('id_pedido').isUUID().withMessage('ID de pedido inválido'),
    body('id_producto').isUUID().withMessage('ID de producto inválido'),
    body('cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0'),
    body('precio_unitario').isNumeric().withMessage('El precio unitario debe ser un número')
];