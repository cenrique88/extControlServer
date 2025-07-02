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


const Incidencias = require('./models/Incidencias');
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





//MANEJO DEL GET DE LAS INCIDENCIAS EN LA BASE DE DATOS INCIDENCIAS
app.get('/incidencias', async (req, res) => {
  try {
    const incidencias = await Incidencias.find();
    res.json(incidencias);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo Incidencias' });
  }
});
//MANEJO DEL GET DE LAS INCIDENCIAS DE UN EXTINTOR EN LA BASE DE DATOS INCIDENCIAS
app.get('/incidencias/:id_extintor', async (req, res) => {
  try {
    const { id_extintor } = req.params;
    const incidencias = await Incidencias.find({id_extintor});
    if (!incidencias) {
      return res.status(404).json({ message: 'Incidencias no Encontrada' });
    }
    res.json(incidencias);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo Incidencias' });
  }
});
//MANEJO DEL GET DE LAS INCIDENCIAS POR ESTADO EN LA BASE DE DATOS INCIDENCIAS
app.get('/incidencias/:estado', async (req, res) => {
  try {
    const {estado} = req.params;
    const incidencias = await Incidencias.find({estado});
    if (!incidencias) {
      return res.status(404).json({ message: 'Incidencias no Encontrada' });
    }
    res.json(incidencias);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo Incidencias' });
  }
});
//MANEJO DEL POST PARA LAS INCIDENCIAS EN LA BASE DE DATOS INCIDENCIAS 
app.post('/incidencias', async (req, res) => {
  try {
    const nuevaIncidencia = new Incidencias(req.body);
    const saved = await nuevaIncidencia.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error guardando la Incidencia' });
  }
});
//MANEJO DE LA ELIMINACION DE UNA INCIDENCIAS EN LA BASE DE DATOS INCIDENCIAS 
app.delete('/incidencias/:id_incidencia', async (req, res) => {
  try {
    const { id_incidencia } = req.params;
    const incidenciaEliminada = await Incidencias.findOneAndDelete({id_incidencia});
    if (!incidenciaEliminada) {
      return res.status(404).json({ message: 'Incidencia no Encontrada' });
    }
    res.json({ message: 'Incidencia eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando Incidencia' });
  }
});



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

