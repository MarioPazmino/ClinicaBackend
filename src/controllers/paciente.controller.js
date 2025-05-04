//src/controllers/paciente.controller.js
const Paciente = require('../models/paciente.model');

exports.getAll = async (req, res) => {
  try {
    const pacientes = await Paciente.getAll();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
};

exports.getById = async (req, res) => {
  try {
    const paciente = await Paciente.getById(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener paciente' });
  }
};

