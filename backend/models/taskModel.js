const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completada'],
    default: 'pendiente'
  },
  responsable: { type: String, default: null }, // <-- NUEVO
  fechaLimite: Date,
  fechaAsignacion: Date,         // <-- NUEVO
  tiempoAsignacion: Number       // <-- NUEVO, en segundos
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

