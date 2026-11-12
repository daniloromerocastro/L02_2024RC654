export const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`); 

    // Manejo de errores específicos de PostgreSQL
    if (err.code === '23505') { // Error de dato duplicado (Unique violation)
        return res.status(400).json({
            status: 'error',
            message: 'Ya existe un registro con esos datos únicos (ej. correo o cédula duplicada).'
        });
    }
    if (err.code === '23503') { // Error de llave foránea (Foreign key violation)
        return res.status(400).json({
            status: 'error',
            message: 'El registro referenciado no existe (revisa los IDs enviados).'
        });
    }

    // Manejo de errores genéricos o personalizados
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Error interno del servidor'
    });
};