//src/controllers/cita.controller.js

const Cita = require('../models/cita.model');

// Obtener todas las citas
exports.getAll = async (req, res) => {
  try {
    const citas = await Cita.getAll();
    res.status(200).json({
      success: true,
      data: citas
    });
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener la lista de citas',
      error: error.message 
    });
  }
};

// Obtener una cita por ID
exports.getById = async (req, res) => {
  try {
    const cita = await Cita.getById(req.params.id);
    
    if (!cita) {
      return res.status(404).json({ 
        success: false,
        message: 'Cita no encontrada' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: cita
    });
  } catch (error) {
    console.error('Error al obtener cita:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener la cita',
      error: error.message 
    });
  }
};

// Crear una nueva cita
exports.create = async (req, res) => {
  try {
    // Validación básica
    const { IdPaciente, IdMedico, FechaHora } = req.body;
    
    if (!IdPaciente || !IdMedico || !FechaHora) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios (IdPaciente, IdMedico, FechaHora)'
      });
    }

    const nuevaCita = await Cita.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Cita creada exitosamente',
      data: nuevaCita
    });
  } catch (error) {
    console.error('Error al crear cita:', error);
    
    // Manejo de errores específicos
    if (error.message.includes('Paciente no encontrado')) {
      return res.status(404).json({
        success: false,
        message: 'Paciente no encontrado'
      });
    }
    
    if (error.message.includes('Médico no encontrado')) {
      return res.status(404).json({
        success: false,
        message: 'Médico no encontrado'
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error al crear la cita',
      error: error.message 
    });
  }
};

// Eliminar una cita
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que existe
    const citaExistente = await Cita.getById(id);
    if (!citaExistente) {
      return res.status(404).json({ 
        success: false,
        message: 'Cita no encontrada' 
      });
    }

    await Cita.delete(id);
    res.status(200).json({
      success: true,
      message: 'Cita eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al eliminar la cita',
      error: error.message 
    });
  }
};

// Actualizar una cita
exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { IdPaciente, IdMedico, FechaHora, Motivo } = req.body;
  
      // Validación básica
      if (!IdPaciente || !IdMedico || !FechaHora || !Motivo) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos obligatorios (IdPaciente, IdMedico, FechaHora, Motivo)'
        });
      }
  
      // Verificar que la cita existe
      const citaExistente = await Cita.getById(id);
      if (!citaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Cita no encontrada'
        });
      }
  
      // Actualizar la cita
      const citaActualizada = await Cita.update(id, req.body);
      res.status(200).json({
        success: true,
        message: 'Cita actualizada exitosamente',
        data: citaActualizada
      });
    } catch (error) {
      console.error('Error al actualizar cita:', error);
  
      // Manejo de errores específicos
      if (error.message.includes('Paciente no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Paciente no encontrado'
        });
      }
  
      if (error.message.includes('Médico no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Médico no encontrado'
        });
      }
  
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la cita',
        error: error.message
      });
    }
  };