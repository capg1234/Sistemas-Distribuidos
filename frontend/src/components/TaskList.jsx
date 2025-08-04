import React, { useEffect, useState, useRef } from 'react'; 
import { getTareas, crearTarea, editarTarea, eliminarTarea } from '../services/api';
import { socket } from '../index';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tareas, setTareas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const formRef = useRef(null); // <-- Cambio 1: Crear una referencia para el formulario

  // Cargar tareas iniciales
  const cargarTareas = async () => {
    const res = await getTareas();
    const tareasOrdenadas = res.data.reverse(); // <-- Cambio 3: Ordenar para mostrar la última primero
    setTareas(tareasOrdenadas);
  };

  useEffect(() => {
    cargarTareas();

    socket.on('tarea:actualizar', () => {
      cargarTareas();
    });

    return () => {
      socket.off('tarea:actualizar');
    };
  }, []);

  // <-- Cambio 1: Desplazarse al formulario al seleccionar una tarea
  useEffect(() => {
    if (tareaSeleccionada && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [tareaSeleccionada]);

  const manejarSubmit = async (formulario) => {
    if (formulario._id) {
      await editarTarea(formulario._id, formulario);
    } else {
      await crearTarea(formulario);
    }
    socket.emit('tarea:nueva', {}); 
    setTareaSeleccionada(null); // <-- Desseleccionar después de enviar
  };

  const manejarEliminar = async (id) => {
    await eliminarTarea(id);
    socket.emit('tarea:nueva', {}); 
  };

  const formatearTiempo = (segundos) => {
    if (segundos == null) return 'No asignado';
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins} min ${secs} s`;
  };

  return (
    <div className="container">
      {/* ... */}
      <TaskForm
        ref={formRef} // <-- Pasar la referencia al componente hijo
        onSubmit={manejarSubmit}
        tareaSeleccionada={tareaSeleccionada}
        limpiarSeleccion={() => setTareaSeleccionada(null)}
      />

      <h3>Lista de Tareas</h3>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea._id} className={tarea.estado.replace(' ', '-')}>
            <strong>{tarea.titulo} - {tarea.estado}</strong>
            <br />
            <small>Descripción: {tarea.descripcion}</small><br />
            <small>Responsable: {tarea.responsable || 'No asignado'}</small><br />
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