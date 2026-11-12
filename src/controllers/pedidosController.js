import * as service from '../services/pedidosServices.js';

export const getPedidos = async (req, res, next) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (e) { next(e); }
};

export const getPedidoById = async (req, res, next) => {
    try {
        const data = await service.getById(req.params.id);
        res.json(data);
    } catch (e) { next(e); }
};

export const postPedido = async (req, res, next) => {
    try {
        const { id_usuario, total } = req.body;
        const nuevo = await service.create(id_usuario, total);
        res.status(201).json(nuevo);
    } catch (e) { next(e); }
};

export const putPedido = async (req, res, next) => {
    try {
        const { id_usuario, total } = req.body;
        const actualizado = await service.update(req.params.id, id_usuario, total);
        res.json(actualizado);
    } catch (e) { next(e); }
};

export const deletePedido = async (req, res, next) => {
    try {
        const eliminado = await service.deletePedido(req.params.id);
        res.json(eliminado);
    } catch (e) { next(e); }
};

export const getPedidosCliente = async (req, res, next) => {
    try {
        const data = await service.getPedidosByCliente(req.params.id_usuario);
        res.json(data);
    } catch (e) { next(e); }
};