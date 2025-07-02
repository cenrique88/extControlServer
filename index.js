const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// DEPENDENCIA PARA CONEXION CON LA BASE DE DATOS:
const connectDB = require('./database');


const Usuarios = require('./models/Usuarios');



const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());

// Conexión a la base de datos
connectDB();

//FOR TEST
app.get('/', async (req, res) => {
  try {
    res.send('<h3 style="position: fixed;">API en Funcionamiento</h3><img src="https://www.rospratechgroup.com/assets/img/portfolio/api.gif" alt="API GIF" style="width: 100%; height: auto;">');
  } catch (error) {
    res.status(500).json({ message: 'Internal Error' });
  }
});



// RUTA PARA EL MANEJO DE LA BASE DE DATOS DE EXTINTORES:
app.use('/extintores', require('./routes/extintores'));

//RUTAS PARA EL MANEJO DE LA BASE DE DATOS DE CLIENTES:
app.use('/clientes', require('./routes/clientes'));

//RUTAS PARA EL MANEJO DE LA BASE DE DATOS DE INSPECCIONES
app.use('/inspecciones', require('./routes/inspecciones'));

//RUTAS PARA EL MANEJO DE LA BASE DE DATOS DE INCIDENCIAS
app.use('/incidencias', require('./routes/incidencias'));




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

