//src/models/medico.model.js
const db = require('../config/db');

const Medico = {
  // Obtener todos los médicos
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM Medico ORDER BY Especialidad, Nombre');
      return rows;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener un médico por ID
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM Medico WHERE Id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },
  
  // Crear un nuevo médico
  create: async (data) => {
    try {
      const { 
        Nombre, 
        Especialidad, 
        Email 
      } = data;

      const [result] = await db.query(
        'INSERT INTO Medico (Nombre, Especialidad, Email) VALUES (?, ?, ?)',
        [Nombre, Especialidad, Email]
      );

      return {
        Id: result.insertId,
        Nombre,
        Especialidad,
        Email
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Actualizar un médico existente
  update: async (id, data) => {
    try {
      const { 
        Nombre, 
        Especialidad, 
        Email 
      } = data;

      await db.query(
        'UPDATE Medico SET Nombre = ?, Especialidad = ?, Email = ? WHERE Id = ?',
        [Nombre, Especialidad, Email, id]
      );

      return {
        Id: id,
        Nombre,
        Especialidad,
        Email
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Eliminar un médico
  delete: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM Medico WHERE Id = ?', [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('Médico no encontrado');
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Medico;