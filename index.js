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

// DEPENDENCIA DE MODELOS DE BASE DE DATOS:
const Extintor = require('./models/Extintor');
const Clientes = require('./models/Clientes');
const Inspecciones = require('./models/Inspecciones')
const Incidencias = require('./models/Incidencias')



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
    res.send('<img src="./api.gif" alt="API GIF">');
  } catch (error) {
    res.status(500).json({ message: 'Internal Error' });
  }
});



// MANEJO DEL GET DE LOS TODOS LOS EXTINTORES DE LA BASE DE DATOS:
app.get('/extintores', async (req, res) => {
  try {
    const extintores = await Extintor.find();
    res.json(extintores);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo extintores' });
  }
});
//MANEJO DEL GET DE UN EXTINTOR DE LA BASE DE DATOS EXTINTORES:
app.get('/extintores/:id_extintor', async (req, res) => {
  try {
    const { id_extintor } = req.params;
    const extintor = await Extintor.findOne({id:id_extintor});
    if (!extintor) {
      return res.status(404).json({ message: 'Extintor no encontrado' });
    }
    res.json(extintor);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo extintores' });
  }
});
//MANEJO DEL POST PARA NUEVO ESTINTOR DE LA BASE DE DATOS EXTINTORES:
app.post('/extintores', async (req, res) => {
  try {
    const nuevoExtintor = new Extintor(req.body);
    const guardado = await nuevoExtintor.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: 'Error guardando extintor' });
  }
});
// MANEJO DE LA EDICION DE UN EXTINTOR EN LA BASE DE DATOS EXTINTORES:
app.put('/extintores/:id_extintor', async (req, res) => {
  try {
    const { id_extintor } = req.params;
    const extintorActualizado = await Extintor.findOneAndUpdate(id_extintor, req.body, { new: true });
    if (!extintorActualizado) {
      return res.status(404).json({ message: 'Extintor no encontrado' });
    }
    res.json(extintorActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando extintor' });
  }
});
// MANEJO DE LA ELIMINACION DE UN EXTINTOR DE LA BASE DE DATOS EXTINTORES:
app.delete('/extintores/:id_extintor', async (req, res) => {
  try {
    const { id_extintor } = req.params;
    const extintorEliminado = await Extintor.findOneAndDelete({id_extintor});
    if (!extintorEliminado) {
      return res.status(404).json({ message: 'Extintor no encontrado' });
    }
    res.json({ message: 'Extintor eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando extintor' });
  }
});


// MANEJO DEL GET DE LOS CLIENTES EN LA BASE DE DATOS CLIENTES:
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Clientes.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo Clientes' });
  }
});
// MANEJO DEL POST PARA NUEVO CLIENTE EN LA BASE DE DATOS CLIENTES:
app.post('/clientes', async (req, res) => {
  try {
    const nuevoCliente = new Clientes(req.body);
    const saved = await nuevoCliente.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error guardando el Cliente' });
  }
});
//MANEJO DEL GET PARA OBTENER UN CLIENTE SOLO
app.get('/clientes/:nombre_cliente', async (req, res) => {
  try {
    const { nombre_cliente } = req.params;
    const cliente = await Clientes.findOne(nombre_cliente);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo Cliente' });
  }
});
//MANEJO DE LA ELIMINACION DE UN CLIENTE DE LA BASE DE DATOS CLIENTES:
app.delete('/clientes/:nombre_cliente', async (req, res) => {
  try {
    const { nombre_cliente } = req.params;
    const clienteEliminado = await Clientes.findOneAndDelete({nombre_cliente});
    if (!clienteEliminado) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando Cliente' });
  }
});


//MANEJO DEL GET DE LAS INSPECCIONES EN LA BASE DE DATOS INSPECCIONES
app.get('/inspecciones', async (req, res) => {
  try {
    const inspeccion = await Inspecciones.find();
    res.json(inspeccion);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo Inspecciones' });
  }
});
//MANEJO DEL GET DE UNA INSPECCIONES EN LA BASE DE DATOS INSPECCIONES
app.get('/inspecciones/:fecha_inspeccion', async (req, res) => {
  try {
    const { fecha_inspeccion } = req.params;
    const inspeccion = await Revisiones.findOne({fecha_inspeccion});
    if (!inspeccion) {
      return res.status(404).json({ message: 'Inspeccion no Encontrada' });
    }
    res.json(inspeccion);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo Inspeccion' });
  }
});
//MANEJO DEL POST PARA LAS INSPECCIONES EN LA BASE DE DATOS INSPECCIONES 
app.post('/inspecciones', async (req, res) => {
  try {
    const nuevaInspeccion = new Inspecciones(req.body);
    const saved = await nuevaInspeccion.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error guardando la Inspeccion' });
  }
});
//MANEJO DE LA ELIMINACION DE UNA INSPECCIONES EN LA BASE DE DATOS INSPECCIONES 
app.delete('/inspecciones/:fecha_inspeccion', async (req, res) => {
  try {
    const { fecha_inspeccion } = req.params;
    const inspeccionEliminada = await Inspecciones.findOneAndDelete({fecha_inspeccion});
    if (!inspeccionEliminada) {
      return res.status(404).json({ message: 'Inspeccion no Encontrada' });
    }
    res.json({ message: 'Inspeccion eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando Inspeccion' });
  }
});


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

