

const express = require('express');
const router = express.Router();

const Incidencias = require('../models/Incidencias');


//MANEJO DEL GET DE LAS INCIDENCIAS EN LA BASE DE DATOS INCIDENCIAS
router.get('/', async (req, res) => {
    try {
        const incidencias = await Incidencias.find();
        res.json(incidencias);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Incidencias', error: error.message });
    }
});


//MANEJO DEL GET DE LAS INCIDENCIAS DE UN EXTINTOR EN LA BASE DE DATOS INCIDENCIAS
router.get('/:id_extintor', async (req, res) => {
    try {
        const { id_extintor } = req.params;
        const incidencias = await Incidencias.find({id_extintor});
        if (!incidencias) {
            return res.status(404).json({ message: 'Incidencias no Encontrada', error: error.message });
        }
        res.json(incidencias);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Incidencias', error: error.message });
    }
});


//MANEJO DEL GET DE LAS INCIDENCIAS POR ESTADO EN LA BASE DE DATOS INCIDENCIAS
router.get('/:estado', async (req, res) => {
    try {
        const {estado} = req.params;
        const incidencias = await Incidencias.find({estado});
        if (!incidencias) {
            return res.status(404).json({ message: 'Incidencias no Encontrada', error: error.message });
    }
        res.json(incidencias);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo Incidencias', error: error.message });
    }
});


//MANEJO DEL POST PARA LAS INCIDENCIAS EN LA BASE DE DATOS INCIDENCIAS 
router.post('/', async (req, res) => {
    try {
        const nuevaIncidencia = new Incidencias(req.body);
        const saved = await nuevaIncidencia.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Error guardando la Incidencia', error: error.message });
    }
});


//MANEJO DE LA ELIMINACION DE UNA INCIDENCIAS EN LA BASE DE DATOS INCIDENCIAS 
router.delete('/:id_incidencia', async (req, res) => {
    try {
        const { id_incidencia } = req.params;
        const incidenciaEliminada = await Incidencias.findOneAndDelete({id_incidencia});
        if (!incidenciaEliminada) {
            return res.status(404).json({ message: 'Incidencia no Encontrada', error: error.message });
        }
    res.json({ message: 'Incidencia eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando Incidencia', error: error.message });
    }
});









module.exports = router;


