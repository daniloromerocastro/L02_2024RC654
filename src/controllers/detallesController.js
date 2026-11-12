import * as service from '../services/detallesServices.js';

export const getDetalles = async (req, res, next) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (e) { next(e); }
};

export const getDetalleById = async (req, res, next) => {
    try {
        const data = await service.getById(req.params.id);
        res.json(data);
    } catch (e) { next(e); }
};

export const postDetalle = async (req, res, next) => {
    try {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
        const nuevo = await service.create(id_pedido, id_producto, cantidad, precio_unitario);
        res.status(201).json(nuevo);
    } catch (e) { next(e); }
};

export const putDetalle = async (req, res, next) => {
    try {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
        const actualizado = await service.update(req.params.id, id_pedido, id_producto, cantidad, precio_unitario);
        res.json(actualizado);
    } catch (e) { next(e); }
};

export const deleteDetalle = async (req, res, next) => {
    try {
        const eliminado = await service.deleteDetalle(req.params.id);
        res.json(eliminado);
    } catch (e) { next(e); }
};

export const getPorPedido = async (req, res, next) => {
    try {
        const data = await service.getDetallesByPedido(req.params.id_pedido);
        res.json(data);
    } catch (e) { next(e); }
};

export const getPorProducto = async (req, res, next) => {
    try {
        const data = await service.getDetallesByProducto(req.params.id_producto);
        res.json(data);
    } catch (e) { next(e); }
};