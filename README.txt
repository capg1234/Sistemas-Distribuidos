## 📦 Tecnologías Utilizadas

- **Frontend:** React, Axios, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB, Socket.IO
- **Base de Datos:** MongoDB
- **Contenedores:** Docker & Docker Compose

---

## 🚀 Requisitos

- Docker instalado
- Docker Compose instalado
- Puerto `3000` (frontend) y `3080` (backend) libres en tu máquina

---

## ⚙️ Estructura del Proyecto

.
├── backend
│ ├── app.js
│ ├── server.js
│ ├── routes
│ │ └── taskRoutes.js
│ └── models
│ └── Tarea.js
├── frontend
│ ├── src
│ │ ├── App.js
│ │ ├── index.js
│ │ └── services
│ │ └── api.js
├── docker-compose.yml
└── README.md

Ejecuta los contenedores
docker-compose up --build

Levantar los contenedores si ya fueron construidos anteriormente
docker-compose up

Parar y limpiar contenedores
docker-compose down

React
npm install
npm start