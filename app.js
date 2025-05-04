const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./src/routes/paciente.routes');
const medicoRoutes = require('./src/routes/medico.routes');
const citaRoutes = require('./src/routes/cita.routes');

const app = express();

// Configurar CORS para permitir el dominio de Angular
app.use(cors({
  origin: 'http://localhost:4200', // Cambia esto al dominio de tu frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Usar rutas
app.use('/api', pacienteRoutes);
app.use('/api', medicoRoutes);
app.use('/api', citaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});