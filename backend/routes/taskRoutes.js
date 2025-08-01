const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tareas', taskController.obtenerTareas);
router.post('/tareas', taskController.crearTarea);
router.put('/tareas/:id', taskController.actualizarTarea);
router.delete('/tareas/:id', taskController.eliminarTarea);

module.exports = router;
