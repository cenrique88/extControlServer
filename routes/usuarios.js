

const express = require('express');
const router = express.Router();

const Usuarios = require('../models/Usuarios');
const {notify, notifyError} = require('./components/notify');



//MANEJO DEL GET DE LOS USUARIOS EN LA BASE DE DATOS INCIDENCIAS
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuarios.find();
        res.json(usuarios);
        notify();
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Usuarios', error: error.message });
        notifyError();
    }
});


//MANEJO DEL GET DE LOS USUARIOS DE UN EXTINTOR EN LA BASE DE DATOS INCIDENCIAS
router.get('/:nombre_usuario', async (req, res) => {
    try {
        const { nombre_usuario } = req.params;
        const incidencias = await Usuarios.find({nombre_usuario});
        if (!nombre_usuario) {
            return res.status(404).json({ message: 'Incidencias no Encontrada', error: error.message });
        }
        res.json(nombre_usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Usuario', error: error.message });
    }
});


//MANEJO DEL POST PARA LOS USUARIOS EN LA BASE DE DATOS INCIDENCIAS 
router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = new Usuarios(req.body);
        const saved = await nuevoUsuario.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Error guardando el Usuario', error: error.message });
    }
});


//MANEJO DE LA ELIMINACION DE UN USUARIO EN LA BASE DE DATOS INCIDENCIAS 
router.delete('/:nombre_usuario', async (req, res) => {
    try {
        const { nombre_usuario } = req.params;
        const usuarioEliminado = await Usuarios.findOneAndDelete({nombre_usuario});
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no Encontrado', error: error.message });
        }
    res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando Ususario', error: error.message });
    }
});











module.exports = router;




