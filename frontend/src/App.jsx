import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div style={styles.container}>
      <h1>🗂️ Sistema de Gestión de Tareas Distribuido</h1>
      <TaskList />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default App;
