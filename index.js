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
const Revisiones = require('./models/Revisiones')




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
    res.send('API de Extintores en funcionamiento');
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo extintores' });
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
    const extintor = await Extintor.findOne(id_extintor);
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


//MANEJO DEL GET DE LAS REVISIONES EN LA BASE DE DATOS REVISIONES
app.get('/revisiones', async (req, res) => {
  try {
    const revision = await Revisiones.find();
    res.json(revision);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo revisiones' });
  }
});
//MANEJO DEL GET DE UNA REVISION EN LA BASE DE DATOS REVISIONES
app.get('/revisiones/:fecha_revision', async (req, res) => {
  try {
    const { fecha_revision } = req.params;
    const revision = await Revisiones.findOne({fecha_revision});
    if (!revision) {
      return res.status(404).json({ message: 'Revision no Encontrada' });
    }
    res.json(revision);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo Revision' });
  }
});
//MANEJO DEL POST PARA LAS REVISONES EN LA BASE DE DATOS REVISIONES
app.post('/revisiones', async (req, res) => {
  try {
    const nuevaRevision = new Revisiones(req.body);
    const saved = await nuevaRevision.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error guardando la Revision' });
  }
});
//MANEJO DE LA ELIMINACION DE UNA REVISION EN LA BASE DE DATOS REVISIONES 
app.delete('/revisiones/:fecha_revision', async (req, res) => {
  try {
    const { fecha_revision } = req.params;
    const revisionEliminado = await Revisiones.findOneAndDelete({fecha_revision});
    if (!revisionEliminado) {
      return res.status(404).json({ message: 'Revision no Encontrada' });
    }
    res.json({ message: 'Revision eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando Revision' });
  }
});





app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

