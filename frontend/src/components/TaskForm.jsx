import React, { useState, useEffect, forwardRef } from 'react';

const estados = ['pendiente', 'en progreso', 'completada'];

const TaskForm = forwardRef(({ onSubmit, tareaSeleccionada, limpiarSeleccion }, ref) => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    fechaLimite: '',
    responsable: ''
  });

  const [inicioAsignacion, setInicioAsignacion] = useState(null); 

  useEffect(() => {
    setInicioAsignacion(new Date()); 

    if (tareaSeleccionada) {
      setForm({
        ...tareaSeleccionada,
        responsable: tareaSeleccionada.responsable || '' 
      });
    }
  }, [tareaSeleccionada]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finAsignacion = new Date(); 

    const tiempoAsignacion = Math.floor((finAsignacion - inicioAsignacion) / 1000); 

    const formConTiempo = {
      ...form,
      inicioAsignacion,
      finAsignacion,
      tiempoAsignacion
    };

    onSubmit(formConTiempo); 

    setForm({
      titulo: '',
      descripcion: '',
      estado: 'pendiente',
      fechaLimite: '',
      responsable: ''
    });
    limpiarSeleccion();
  };

  return (
    <form onSubmit={handleSubmit} ref={ref}> {/* <-- Cambio 1: Referencia del formulario */}
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
        /*onClick={(e) => e.target.showPicker()}
        onFocus={(e) => e.target.showPicker()}*/
      />
      <br />

      <input
        type="text"
        name="responsable"
        placeholder="Responsable"
        value={form.responsable}
        onChange={handleChange}
      />
      <br />

      <button type="submit">{tareaSeleccionada ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
});

export default TaskForm;