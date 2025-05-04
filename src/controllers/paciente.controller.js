//src/controllers/paciente.controller.js
const Paciente = require('../models/paciente.model');

// Obtener todos los pacientes
exports.getAll = async (req, res) => {
  try {
    const pacientes = await Paciente.getAll();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener la lista de pacientes',
      error: error.message 
    });
  }
};

// Obtener un paciente por ID
exports.getById = async (req, res) => {
  try {
    const paciente = await Paciente.getById(req.params.id);
    
    if (!paciente) {
      return res.status(404).json({ 
        success: false,
        message: 'Paciente no encontrado' 
      });
    }
    
    res.status(200).json(paciente);
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener el paciente',
      error: error.message 
    });
  }
};

// Crear un nuevo paciente
exports.create = async (req, res) => {
  try {
    // Validación básica
    const { Nombre, Apellido, Cedula, FechaNacimiento } = req.body;
    
    if (!Nombre || !Apellido || !Cedula || !FechaNacimiento) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios (Nombre, Apellido, Cedula, FechaNacimiento)'
      });
    }

    const nuevoPaciente = await Paciente.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Paciente creado exitosamente',
      data: nuevoPaciente
    });
  } catch (error) {
    console.error('Error al crear paciente:', error);
    
    // Manejo específico para duplicados de cédula
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un paciente con esta cédula'
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error al crear el paciente',
      error: error.message 
    });
  }
};

// Actualizar un paciente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que existe
    const pacienteExistente = await Paciente.getById(id);
    if (!pacienteExistente) {
      return res.status(404).json({ 
        success: false,
        message: 'Paciente no encontrado' 
      });
    }

    // Validación básica
    const { Nombre, Apellido, Cedula, FechaNacimiento, Email } = req.body;
    
    if (!Nombre || !Apellido || !Cedula || !FechaNacimiento) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios (Nombre, Apellido, Cedula, FechaNacimiento)'
      });
    }

    const pacienteActualizado = await Paciente.update(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Paciente actualizado exitosamente',
      data: pacienteActualizado
    });
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    
    // Manejo específico para duplicados de cédula
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un paciente con esta cédula'
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error al actualizar el paciente',
      error: error.message 
    });
  }
};

// Eliminar un paciente
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que existe
    const pacienteExistente = await Paciente.getById(id);
    if (!pacienteExistente) {
      return res.status(404).json({ 
        success: false,
        message: 'Paciente no encontrado' 
      });
    }

    await Paciente.delete(id);
    res.status(200).json({
      success: true,
      message: 'Paciente eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al eliminar el paciente',
      error: error.message 
    });
  }
};