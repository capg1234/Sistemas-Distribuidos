const Task = require('../models/taskModel');

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Task.find();
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

// Crear nueva tarea
exports.crearTarea = async (req, res) => {
  try {
    //const nuevaTarea = new Task(req.body);
    const { titulo, descripcion, estado, fechaLimite, inicioAsignacion, finAsignacion, tiempoAsignacion } = req.body;
    const nuevaTarea = new Task({
      titulo,
      descripcion,
      estado,
      fechaLimite,
      inicioAsignacion,
      finAsignacion,
      tiempoAsignacion
    });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear la tarea' });
  }
};

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const { titulo, descripcion, estado, fechaLimite } = req.body;

    const tareaExistente = await Task.findById(req.params.id);
    if (!tareaExistente) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Verificar si aún no se ha asignado y esta es la primera vez que se asigna
    if (!tareaExistente.fechaAsignacion) {
      const fechaAsignacion = new Date();
      const tiempoAsignacion = (fechaAsignacion - tareaExistente.createdAt) / 1000; // en segundos

      tareaExistente.fechaAsignacion = fechaAsignacion;
      tareaExistente.tiempoAsignacion = tiempoAsignacion;
    }

    tareaExistente.titulo = titulo;
    tareaExistente.descripcion = descripcion;
    tareaExistente.estado = estado;
    tareaExistente.fechaLimite = fechaLimite;

    const tareaActualizada = await tareaExistente.save();
    res.json(tareaActualizada);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar la tarea' });
  }
};

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Task.findByIdAndDelete(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};
