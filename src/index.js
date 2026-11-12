import express from 'express';
import dotenv from 'dotenv';

// Importar los Middlewares
import { errorHandler } from './middlewares/errorHandler.js';

// Importar las Rutas
import usuariosRoutes from './routes/usuariosRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import detallesRoutes from './routes/detallesRoutes.js';

dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta base para probar que el servidor vive
app.get('/', (req, res) => {
    res.send('API de Pedidos funcionando correctamente 🚀');
});

// Conectar las rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/detalles', detallesRoutes);

// Middleware de Errores (al final, después de las rutas)
app.use(errorHandler);

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});