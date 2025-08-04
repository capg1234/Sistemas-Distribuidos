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
    const {
      titulo,
      descripcion,
      estado,
      fechaLimite,
      responsable,
      fechaAsignacion,      // <- nuevo
      tiempoAsignacion      // <- nuevo
    } = req.body;

    const nuevaTarea = new Task({
      titulo,
      descripcion,
      estado,
      fechaLimite,
      responsable,
      fechaAsignacion,
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
  console.log('Datos recibidos en la solicitud de actualización:', req.body);
  try {
    const { titulo, descripcion, estado, fechaLimite, responsable } = req.body;

    const tareaExistente = await Task.findById(req.params.id);
    if (!tareaExistente) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Detectar si se asigna responsable por primera vez
    const seAsignoPorPrimeraVez = !tareaExistente.responsable && responsable;
    if (seAsignoPorPrimeraVez) {
      const ahora = new Date();
      tareaExistente.fechaAsignacion = ahora;
      tareaExistente.tiempoAsignacion = Math.floor((ahora - tareaExistente.createdAt) / 1000); // segundos
    }

    // Actualizamos los campos
    tareaExistente.titulo = titulo;
    tareaExistente.descripcion = descripcion;
    tareaExistente.estado = estado;
    tareaExistente.fechaLimite = fechaLimite;
    tareaExistente.responsable = responsable;

    const tareaActualizada = await tareaExistente.save();
    res.json(tareaActualizada);
  } catch (err) {
    console.error(err);
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
