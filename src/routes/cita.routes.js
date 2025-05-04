//src/routes/cita.routes.js
const express = require('express');
const router = express.Router();
const citaCtrl = require('../controllers/cita.controller');

// Rutas para citas
router.get('/citas', citaCtrl.getAll);
router.get('/citas/:id', citaCtrl.getById);
router.post('/citas', citaCtrl.create);
router.delete('/citas/:id', citaCtrl.delete);
router.put('/citas/:id', citaCtrl.update);

module.exports = router;