import { pool } from '../db.js';

export const getAll = async () => {
    const res = await pool.query('SELECT * FROM detalles_pedido');
    return res.rows;
};

export const getById = async (id) => {
    const res = await pool.query('SELECT * FROM detalles_pedido WHERE id_detalle = $1', [id]);
    if (res.rowCount === 0) throw new Error('Detalle no encontrado');
    return res.rows[0];
};

export const create = async (id_pedido, id_producto, cantidad, precio_unitario) => {
    const res = await pool.query(
        'INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *', 
        [id_pedido, id_producto, cantidad, precio_unitario]
    );
    return res.rows[0];
};

export const update = async (id, id_pedido, id_producto, cantidad, precio_unitario) => {
    const res = await pool.query(
        'UPDATE detalles_pedido SET id_pedido=$1, id_producto=$2, cantidad=$3, precio_unitario=$4 WHERE id_detalle=$5 RETURNING *', 
        [id_pedido, id_producto, cantidad, precio_unitario, id]
    );
    if (res.rowCount === 0) throw new Error('Detalle no encontrado');
    return res.rows[0];
};

export const deleteDetalle = async (id) => {
    const res = await pool.query('DELETE FROM detalles_pedido WHERE id_detalle=$1 RETURNING *', [id]);
    if (res.rowCount === 0) throw new Error('Detalle no encontrado');
    return { message: 'Detalle eliminado', detalle: res.rows[0] };
};

export const getDetallesByPedido = async (id_pedido) => {
    const res = await pool.query('SELECT * FROM detalles_pedido WHERE id_pedido = $1', [id_pedido]);
    return res.rows;
};

export const getDetallesByProducto = async (id_producto) => {
    const res = await pool.query('SELECT * FROM detalles_pedido WHERE id_producto = $1', [id_producto]);
    return res.rows;
};