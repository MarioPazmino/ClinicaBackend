// src/models/cita.model.js
const db = require('../config/db');

const Cita = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT c.*, p.Nombre AS PacienteNombre, m.Nombre AS MedicoNombre 
      FROM Cita c
      JOIN Paciente p ON c.IdPaciente = p.Id
      JOIN Medico m ON c.IdMedico = m.Id
    `);
    return rows;
  },
  
  create: async (data) => {
    const { IdPaciente, IdMedico, FechaHora, Motivo } = data;
    const [result] = await db.query(
      'INSERT INTO Cita (IdPaciente, IdMedico, FechaHora, Motivo) VALUES (?, ?, ?, ?)',
      [IdPaciente, IdMedico, FechaHora, Motivo]
    );
    return { id: result.insertId, ...data };
  }
};

module.exports = Cita;