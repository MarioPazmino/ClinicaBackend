// src/models/cita.model.js
const db = require('../config/db');

const Cita = {
  // Obtener todas las citas con información del paciente y médico
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          c.Id, 
          c.FechaHora, 
          c.Motivo,
          p.Id AS PacienteId,
          p.Nombre AS PacienteNombre,
          p.Apellido AS PacienteApellido,
          p.Cedula AS PacienteCedula,
          m.Id AS MedicoId,
          m.Nombre AS MedicoNombre,
          m.Especialidad AS MedicoEspecialidad
        FROM Cita c
        JOIN Paciente p ON c.IdPaciente = p.Id
        JOIN Medico m ON c.IdMedico = m.Id
        ORDER BY c.FechaHora DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener una cita por ID
  getById: async (id) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          c.Id, 
          c.FechaHora, 
          c.Motivo,
          p.Id AS PacienteId,
          p.Nombre AS PacienteNombre,
          p.Apellido AS PacienteApellido,
          p.Cedula AS PacienteCedula,
          m.Id AS MedicoId,
          m.Nombre AS MedicoNombre,
          m.Especialidad AS MedicoEspecialidad
        FROM Cita c
        JOIN Paciente p ON c.IdPaciente = p.Id
        JOIN Medico m ON c.IdMedico = m.Id
        WHERE c.Id = ?
      `, [id]);
      
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },
  
  // Crear una nueva cita
  create: async (data) => {
    try {
      const { IdPaciente, IdMedico, FechaHora, Motivo } = data;

      // Verificar que existen el paciente y médico
      const [paciente] = await db.query('SELECT * FROM Paciente WHERE Id = ?', [IdPaciente]);
      const [medico] = await db.query('SELECT * FROM Medico WHERE Id = ?', [IdMedico]);
      
      if (!paciente.length) {
        throw new Error('Paciente no encontrado');
      }
      
      if (!medico.length) {
        throw new Error('Médico no encontrado');
      }

      const [result] = await db.query(
        'INSERT INTO Cita (IdPaciente, IdMedico, FechaHora, Motivo) VALUES (?, ?, ?, ?)',
        [IdPaciente, IdMedico, FechaHora, Motivo]
      );

      // Obtener la cita creada con información completa
      return await Cita.getById(result.insertId);
    } catch (error) {
      throw error;
    }
  },

  // Actualizar una cita
update: async (id, data) => {
  try {
    const { IdPaciente, IdMedico, FechaHora, Motivo } = data;

    // Verificar que existen el paciente y médico
    const [paciente] = await db.query('SELECT * FROM Paciente WHERE Id = ?', [IdPaciente]);
    const [medico] = await db.query('SELECT * FROM Medico WHERE Id = ?', [IdMedico]);

    if (!paciente.length) {
      throw new Error('Paciente no encontrado');
    }

    if (!medico.length) {
      throw new Error('Médico no encontrado');
    }

    const [result] = await db.query(
      'UPDATE Cita SET IdPaciente = ?, IdMedico = ?, FechaHora = ?, Motivo = ? WHERE Id = ?',
      [IdPaciente, IdMedico, FechaHora, Motivo, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Cita no encontrada');
    }

    // Obtener la cita actualizada con información completa
    return await Cita.getById(id);
  } catch (error) {
    throw error;
  }
},
  
  // Eliminar una cita
  delete: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM Cita WHERE Id = ?', [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('Cita no encontrada');
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Cita;