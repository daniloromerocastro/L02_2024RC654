import * as service from '../services/productosServices.js';

export const getProductos = async (req, res, next) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (e) { next(e); }
};

export const getProductoById = async (req, res, next) => {
    try {
        const data = await service.getById(req.params.id);
        res.json(data);
    } catch (e) { next(e); }
};

export const postProducto = async (req, res, next) => {
    try {
        const { nombre_producto, precio } = req.body;
        const nuevo = await service.create(nombre_producto, precio);
        res.status(201).json(nuevo);
    } catch (e) { next(e); }
};

export const putProducto = async (req, res, next) => {
    try {
        const { nombre_producto, precio } = req.body;
        const actualizado = await service.update(req.params.id, nombre_producto, precio);
        res.json(actualizado);
    } catch (e) { next(e); }
};

export const deleteProducto = async (req, res, next) => {
    try {
        const eliminado = await service.deleteProduct(req.params.id);
        res.json(eliminado);
    } catch (e) { next(e); }
};

export const getTopN = async (req, res, next) => {
    try {
        const n = parseInt(req.params.n);
        if (isNaN(n) || n <= 0) throw new Error('El parámetro N debe ser un número mayor a 0');
        const data = await service.getTopProductos(n);
        res.json(data);
    } catch (e) { next(e); }
};