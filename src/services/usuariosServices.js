import { pool } from '../db.js';

export const getAll = async () => {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
};

export const getById = async (id) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
    if (res.rowCount === 0) throw new Error('Usuario no encontrado');
    return res.rows[0];
};

export const create = async (nombre, apellido, correo) => {
    const res = await pool.query(
        'INSERT INTO usuarios (nombre, apellido, correo) VALUES ($1, $2, $3) RETURNING *', 
        [nombre, apellido, correo]
    );
    return res.rows[0];
};

export const update = async (id, nombre, apellido, correo) => {
    const res = await pool.query(
        'UPDATE usuarios SET nombre=$1, apellido=$2, correo=$3 WHERE id_usuario=$4 RETURNING *', 
        [nombre, apellido, correo, id]
    );
    if (res.rowCount === 0) throw new Error('Usuario no encontrado');
    return res.rows[0];
};

export const deleteUser = async (id) => {
    const res = await pool.query('DELETE FROM usuarios WHERE id_usuario=$1 RETURNING *', [id]);
    if (res.rowCount === 0) throw new Error('Usuario no encontrado');
    return { message: 'Usuario eliminado', usuario: res.rows[0] };
};

// Filtros
export const searchByNombre = async (nombre) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE nombre ILIKE $1', [`%${nombre}%`]);
    return res.rows;
};

export const searchByApellido = async (apellido) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE apellido ILIKE $1', [`%${apellido}%`]);
    return res.rows;
};

export const searchByCorreo = async (correo) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE correo ILIKE $1', [`%${correo}%`]);
    return res.rows;
};