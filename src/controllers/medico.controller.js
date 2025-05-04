//src/controllers/medico.controller.js
const Medico = require('../models/medico.model');

// Obtener todos los médicos
exports.getAll = async (req, res) => {
  try {
    const medicos = await Medico.getAll();
    res.status(200).json(medicos);
  } catch (error) {
    console.error('Error al obtener médicos:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener la lista de médicos',
      error: error.message 
    });
  }
};

// Obtener un médico por ID
exports.getById = async (req, res) => {
  try {
    const medico = await Medico.getById(req.params.id);
    
    if (!medico) {
      return res.status(404).json({ 
        success: false,
        message: 'Médico no encontrado' 
      });
    }
    
    res.status(200).json(medico);
  } catch (error) {
    console.error('Error al obtener médico:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener el médico',
      error: error.message 
    });
  }
};

// Crear un nuevo médico
exports.create = async (req, res) => {
  try {
    // Validación básica
    const { Nombre, Especialidad } = req.body;
    
    if (!Nombre || !Especialidad) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios (Nombre, Especialidad)'
      });
    }

    const nuevoMedico = await Medico.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Médico creado exitosamente',
      data: nuevoMedico
    });
  } catch (error) {
    console.error('Error al crear médico:', error);
    
    // Manejo específico para duplicados (ej: Email único)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un médico con este correo electrónico'
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error al crear el médico',
      error: error.message 
    });
  }
};

// Actualizar un médico
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que existe
    const medicoExistente = await Medico.getById(id);
    if (!medicoExistente) {
      return res.status(404).json({ 
        success: false,
        message: 'Médico no encontrado' 
      });
    }

    // Validación básica
    const { Nombre, Especialidad } = req.body;
    
    if (!Nombre || !Especialidad) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios (Nombre, Especialidad)'
      });
    }

    const medicoActualizado = await Medico.update(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Médico actualizado exitosamente',
      data: medicoActualizado
    });
  } catch (error) {
    console.error('Error al actualizar médico:', error);
    
    // Manejo específico para duplicados (ej: Email único)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un médico con este correo electrónico'
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error al actualizar el médico',
      error: error.message 
    });
  }
};

// Eliminar un médico
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que existe
    const medicoExistente = await Medico.getById(id);
    if (!medicoExistente) {
      return res.status(404).json({ 
        success: false,
        message: 'Médico no encontrado' 
      });
    }

    await Medico.delete(id);
    res.status(200).json({
      success: true,
      message: 'Médico eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar médico:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al eliminar el médico',
      error: error.message 
    });
  }
};