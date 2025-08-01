import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { io } from 'socket.io-client';

/*export const socket = io("http://localhost:3000");*/
export const socket = io("http://localhost:3080");
/*export const socket = io("http://backend:3080");*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
