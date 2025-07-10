

const express = require('express');
const router = express.Router();

const Clientes = require('../models/Clientes');



// MANEJO DEL GET DE LOS CLIENTES EN LA BASE DE DATOS CLIENTES:
router.get('/', async (req, res) => {
    try {
        const clientes = await Clientes.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Clientes', error: error.message });
    }
});


// MANEJO DEL POST PARA NUEVO CLIENTE EN LA BASE DE DATOS CLIENTES:
router.post('/add-client', async (req, res) => {
    try {
        const nuevoCliente = new Clientes(req.body);
        const saved = await nuevoCliente.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Error guardando el Cliente', error: error.message });
    }
});


//MANEJO DEL GET PARA OBTENER UN CLIENTE SOLO
router.get('/:nombre_cliente', async (req, res) => {
    try {
        const { nombre_cliente } = req.params;
        const cliente = await Clientes.findOne({nombre_cliente: nombre_cliente});
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado', error: error.message });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Cliente', error: error.message });
    }
});

// MANEJO DE LA EDICION DE UN CLIENTE EN LA BASE DE DATOS CLIENTES:
router.put('/edit-client/:nombre_cliente', async (req, res) => {
    try {
        const { nombre_cliente } = req.params;
        const clienteActualizado = await Extintor.findOneAndUpdate(nombre_cliente, req.body, { new: true });
        if (!clienteActualizado) {
            return res.status(404).json({ message: 'Cliente no encontrado', error: error.message });
        }
        res.json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando cliente', error: error.message });
    }
});


//MANEJO DE LA ELIMINACION DE UN CLIENTE DE LA BASE DE DATOS CLIENTES:
router.delete('/:nombre_cliente', async (req, res) => {
    try {
        const { nombre_cliente } = req.params;
        const clienteEliminado = await Clientes.findOneAndDelete({nombre_cliente});
        if (!clienteEliminado) {
            return res.status(404).json({ message: 'Cliente no encontrado', error: error.message });
        }
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando Cliente', error: error.message });
    }
});










module.exports = router;