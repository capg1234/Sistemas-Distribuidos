import React, { useState, useEffect } from 'react';

const estados = ['pendiente', 'en progreso', 'completada'];


const TaskForm = ({ onSubmit, tareaSeleccionada, limpiarSeleccion }) => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    fechaLimite: ''
  });

  const [inicioAsignacion, setInicioAsignacion] = useState(null); // nuevo estado

  useEffect(() => {
    setInicioAsignacion(new Date()); // registrar el inicio al cargar o editar

    if (tareaSeleccionada) {
      setForm(tareaSeleccionada);
    }
  }, [tareaSeleccionada]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finAsignacion = new Date(); // captura del momento del envío

    const tiempoAsignacion = Math.floor((finAsignacion - inicioAsignacion) / 1000); // en segundos 

    const formConTiempo = {
      ...form,
      inicioAsignacion,
      finAsignacion,
      tiempoAsignacion
    };

    onSubmit(formConTiempo); // enviar datos con los tiempos registrados

    // limpiar formulario
    setForm({
      titulo: '',
      descripcion: '',
      estado: 'pendiente',
      fechaLimite: ''
    });
    limpiarSeleccion();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{tareaSeleccionada ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        required
      />
      <br />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
      />
      <br />
      <select name="estado" value={form.estado} onChange={handleChange}>
        {estados.map((estado) => (
          <option key={estado} value={estado}>{estado}</option>
        ))}
      </select>
      <br />
      <input
        type="date"
        name="fechaLimite"
        value={form.fechaLimite?.slice(0, 10)}
        onChange={handleChange}
      />
      <br />
      <button type="submit">{tareaSeleccionada ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default TaskForm;
