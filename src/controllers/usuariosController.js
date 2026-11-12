import * as service from '../services/usuariosServices.js';

export const getUsuarios = async (req, res, next) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (e) {
        next(e);
    }
};

export const getUsuarioById = async (req, res, next) => {
    try {
        const data = await service.getById(req.params.id);
        res.json(data);
    } catch (e) {
        next(e);
    }
};

export const postUsuario = async (req, res, next) => {
    try {
        const { nombre, apellido, correo } = req.body;
        const nuevo = await service.create(nombre, apellido, correo);
        res.status(201).json(nuevo);
    } catch (e) {
        next(e);
    }
};

export const putUsuario = async (req, res, next) => {
    try {
        const { nombre, apellido, correo } = req.body;
        const actualizado = await service.update(req.params.id, nombre, apellido, correo);
        res.json(actualizado);
    } catch (e) {
        next(e);
    }
};

export const deleteUsuario = async (req, res, next) => {
    try {
        const eliminado = await service.deleteUser(req.params.id);
        res.json(eliminado);
    } catch (e) {
        next(e);
    }
};

// --- Filtros ---
export const filtroNombre = async (req, res, next) => {
    try {
        const data = await service.searchByNombre(req.params.nombre);
        res.json(data);
    } catch (e) {
        next(e);
    }
};

export const filtroApellido = async (req, res, next) => {
    try {
        const data = await service.searchByApellido(req.params.apellido);
        res.json(data);
    } catch (e) {
        next(e);
    }
};

export const filtroCorreo = async (req, res, next) => {
    try {
        const data = await service.searchByCorreo(req.params.correo);
        res.json(data);
    } catch (e) {
        next(e);
    }
};