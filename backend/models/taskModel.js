const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  estado: String,
  fechaLimite: Date,
  fechaAsignacion: Date,         // <-- nuevo
  tiempoAsignacion: Number       // <-- nuevo, en segundos
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
/*const taskSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completada'],
    default: 'pendiente'
  },
  fechaCreacion: { type: Date, default: Date.now },
  fechaLimite: Date,

  // Seguimiento de tiempo de asignación
  inicioAsignacion: { type: Date },
  finAsignacion: { type: Date },
  tiempoAsignacion: Number // en segundos
});

module.exports = mongoose.model('Task', taskSchema);*/
