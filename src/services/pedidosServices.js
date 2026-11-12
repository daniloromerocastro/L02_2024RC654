import { pool } from '../db.js';

export const getAll = async () => {
    const res = await pool.query('SELECT * FROM pedidos');
    return res.rows;
};

export const getById = async (id) => {
    const res = await pool.query('SELECT * FROM pedidos WHERE id_pedido = $1', [id]);
    if (res.rowCount === 0) throw new Error('Pedido no encontrado');
    return res.rows[0];
};

export const create = async (id_usuario, total) => {
    const res = await pool.query(
        'INSERT INTO pedidos (id_usuario, total) VALUES ($1, $2) RETURNING *', 
        [id_usuario, total]
    );
    return res.rows[0];
};

export const update = async (id, id_usuario, total) => {
    const res = await pool.query(
        'UPDATE pedidos SET id_usuario=$1, total=$2 WHERE id_pedido=$3 RETURNING *', 
        [id_usuario, total, id]
    );
    if (res.rowCount === 0) throw new Error('Pedido no encontrado');
    return res.rows[0];
};

export const deletePedido = async (id) => {
    const res = await pool.query('DELETE FROM pedidos WHERE id_pedido=$1 RETURNING *', [id]);
    if (res.rowCount === 0) throw new Error('Pedido no encontrado');
    return { message: 'Pedido eliminado', pedido: res.rows[0] };
};

export const getPedidosByCliente = async (id_usuario) => {
    const res = await pool.query('SELECT * FROM pedidos WHERE id_usuario = $1', [id_usuario]);
    return res.rows;
};