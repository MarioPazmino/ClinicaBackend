const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./routes/paciente.routes');
const medicoRoutes = require('./routes/medico.routes');
const citaRoutes = require('./routes/cita.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api', pacienteRoutes);
app.use('/api', medicoRoutes);
app.use('/api', citaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});