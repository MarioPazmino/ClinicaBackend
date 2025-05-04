//src/routes/medico.routes.js
const express = require('express');
const router = express.Router();
const medicoCtrl = require('../controllers/medico.controller');

// Rutas para médicos
router.get('/medicos', medicoCtrl.getAll);
router.get('/medicos/:id', medicoCtrl.getById);
router.post('/medicos', medicoCtrl.create);
router.put('/medicos/:id', medicoCtrl.update);
router.delete('/medicos/:id', medicoCtrl.delete);

module.exports = router;