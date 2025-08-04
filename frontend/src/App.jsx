import React from 'react';
import './styles.css';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className="container">
      <header className="header">
        <img src="/logo2.png" alt="Logo de TareaSync" className="logo" />
        {/*<h1 className="logo-text">🗂️ Sistema de Gestión de Tareas Distribuido</h1>*/}
      </header>
      <TaskList />
    </div>
  );
};

export default App;
