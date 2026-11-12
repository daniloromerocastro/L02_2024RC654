import { pool } from '../db.js';

export const getAll = async () => {
    const res = await pool.query('SELECT * FROM productos');
    return res.rows;
};

export const getById = async (id) => {
    const res = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [id]);
    if (res.rowCount === 0) throw new Error('Producto no encontrado');
    return res.rows[0];
};

export const create = async (nombre_producto, precio) => {
    const res = await pool.query(
        'INSERT INTO productos (nombre_producto, precio) VALUES ($1, $2) RETURNING *', 
        [nombre_producto, precio]
    );
    return res.rows[0];
};

export const update = async (id, nombre_producto, precio) => {
    const res = await pool.query(
        'UPDATE productos SET nombre_producto=$1, precio=$2 WHERE id_producto=$3 RETURNING *', 
        [nombre_producto, precio, id]
    );
    if (res.rowCount === 0) throw new Error('Producto no encontrado');
    return res.rows[0];
};

export const deleteProduct = async (id) => {
    const res = await pool.query('DELETE FROM productos WHERE id_producto=$1 RETURNING *', [id]);
    if (res.rowCount === 0) throw new Error('Producto no encontrado');
    return { message: 'Producto eliminado', producto: res.rows[0] };
};

export const getTopProductos = async (n) => {
    const query = `
        SELECT p.nombre_producto AS "nombre_producto", SUM(d.cantidad) AS "cantidad_total_vendida"
        FROM detalles_pedido d
        JOIN productos p ON d.id_producto = p.id_producto
        GROUP BY p.nombre_producto
        ORDER BY "cantidad_total_vendida" DESC
        LIMIT $1
    `;
    const result = await pool.query(query, [n]);
    return result.rows;
};