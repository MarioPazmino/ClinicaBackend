//src/models/paciente.model.js
const db = require('../config/db');

const Paciente = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM Paciente');
    return rows;
  },
  
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Paciente WHERE Id = ?', [id]);
    return rows[0];
  },
  
  create: async (data) => {
    const { Nombre, Apellido, Cedula, FechaNacimiento, Email } = data;
    const [result] = await db.query(
      'INSERT INTO Paciente (Nombre, Apellido, Cedula, FechaNacimiento, Email) VALUES (?, ?, ?, ?, ?)',
      [Nombre, Apellido, Cedula, FechaNacimiento, Email]
    );
    return { id: result.insertId, ...data };
  },
  
  update: async (id, data) => {
    const { Nombre, Apellido, Cedula, FechaNacimiento, Email } = data;
    await db.query(
      'UPDATE Paciente SET Nombre = ?, Apellido = ?, Cedula = ?, FechaNacimiento = ?, Email = ? WHERE Id = ?',
      [Nombre, Apellido, Cedula, FechaNacimiento, Email, id]
    );
    return { id, ...data };
  },
  
  delete: async (id) => {
    await db.query('DELETE FROM Paciente WHERE Id = ?', [id]);
    return { message: 'Paciente eliminado' };
  }
};

module.exports = Paciente;