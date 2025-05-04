//src/models/paciente.model.js
const db = require('../config/db');

const Paciente = {
  // Obtener todos los pacientes
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM Paciente ORDER BY Apellido, Nombre');
      return rows;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener un paciente por ID
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM Paciente WHERE Id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },
  
  // Crear un nuevo paciente
  create: async (data) => {
    try {
      const { 
        Nombre, 
        Apellido, 
        Cedula, 
        FechaNacimiento, 
        Email 
      } = data;

      const [result] = await db.query(
        'INSERT INTO Paciente (Nombre, Apellido, Cedula, FechaNacimiento, Email) VALUES (?, ?, ?, ?, ?)',
        [Nombre, Apellido, Cedula, FechaNacimiento, Email]
      );

      return {
        Id: result.insertId,
        Nombre,
        Apellido,
        Cedula,
        FechaNacimiento,
        Email
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Actualizar un paciente existente
  update: async (id, data) => {
    try {
      const { 
        Nombre, 
        Apellido, 
        Cedula, 
        FechaNacimiento, 
        Email 
      } = data;

      await db.query(
        'UPDATE Paciente SET Nombre = ?, Apellido = ?, Cedula = ?, FechaNacimiento = ?, Email = ? WHERE Id = ?',
        [Nombre, Apellido, Cedula, FechaNacimiento, Email, id]
      );

      return {
        Id: id,
        Nombre,
        Apellido,
        Cedula,
        FechaNacimiento,
        Email
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Eliminar un paciente
  delete: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM Paciente WHERE Id = ?', [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('Paciente no encontrado');
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Paciente;