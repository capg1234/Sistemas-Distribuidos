import React, { useEffect, useState } from 'react';
import { getTareas, crearTarea, editarTarea, eliminarTarea } from '../services/api';
import { socket } from '../index';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tareas, setTareas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  // Cargar tareas iniciales
  const cargarTareas = async () => {
    const res = await getTareas();
    setTareas(res.data);
  };

  useEffect(() => {
    cargarTareas();

    // Escuchar eventos de actualización
    socket.on('tarea:actualizar', () => {
      cargarTareas();
    });

    return () => {
      socket.off('tarea:actualizar');
    };
  }, []);

  const manejarSubmit = async (formulario) => {
    if (formulario._id) {
      await editarTarea(formulario._id, formulario);
    } else {
      await crearTarea(formulario);
    }
    socket.emit('tarea:nueva', {}); // Emitir para sincronizar
  };

  const manejarEliminar = async (id) => {
    await eliminarTarea(id);
    socket.emit('tarea:nueva', {}); // Emitir para sincronizar
  };

  //Función para mostrar el tiempo en formato legible
  const formatearTiempo = (segundos) => {
    if (segundos == null) return 'No asignado';
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins} min ${secs} s`;
  };

  return (
    <div>
      <TaskForm
        onSubmit={manejarSubmit}
        tareaSeleccionada={tareaSeleccionada}
        limpiarSeleccion={() => setTareaSeleccionada(null)}
      />

      <h3>Lista de Tareas</h3>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea._id}>
            <strong>{tarea.titulo}</strong> - {tarea.estado}
            <br />
            <small>Fecha límite: {tarea.fechaLimite?.slice(0, 10) || 'No definida'}</small>
            <br />
            <small>
              Tiempo para asignar: <strong>{formatearTiempo(tarea.tiempoAsignacion)}</strong>
            </small>
            <br />
            <button onClick={() => setTareaSeleccionada(tarea)}>Editar</button>
            <button onClick={() => manejarEliminar(tarea._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
