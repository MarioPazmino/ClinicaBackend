//src/routes/paciente.routes.js
const express = require('express');
const router = express.Router();
const pacienteCtrl = require('../controllers/paciente.controller');

router.get('/pacientes', pacienteCtrl.getAll);
router.get('/pacientes/:id', pacienteCtrl.getById);
router.post('/pacientes', pacienteCtrl.create);
router.put('/pacientes/:id', pacienteCtrl.update);
router.delete('/pacientes/:id', pacienteCtrl.delete);

module.exports = router;