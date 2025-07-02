
const express = require('express');
const router = express.Router();

const Extintor = require('../models/Extintor');


// MANEJO DEL GET DE LOS TODOS LOS EXTINTORES DE LA BASE DE DATOS:
router.get('/', async (req, res) => {
    try {
        const extintores = await Extintor.find();
        res.json(extintores);
    }   catch (error) {
            res.status(500).json({ message: 'Error obteniendo extintores', error: error.message });
        }
});


//MANEJO DEL GET DE UN EXTINTOR DE LA BASE DE DATOS EXTINTORES:
router.get('/extintores/:id_extintor', async (req, res) => {
    try {
        const { id_extintor } = req.params;
        const extintor = await Extintor.findOne({id:id_extintor});
        if (!extintor) {
        return res.status(404).json({ message: 'Extintor no encontrado', error: error.message });
        }
        res.json(extintor);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo extintores', error: error.message });
    }
});


//MANEJO DEL POST PARA NUEVO ESTINTOR DE LA BASE DE DATOS EXTINTORES:
router.post('/extintores', async (req, res) => {
    try {
        const nuevoExtintor = new Extintor(req.body);
        const guardado = await nuevoExtintor.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(500).json({ message: 'Error guardando extintor', error: error.message });
    }
});


// MANEJO DE LA EDICION DE UN EXTINTOR EN LA BASE DE DATOS EXTINTORES:
router.put('/extintores/:id_extintor', async (req, res) => {
    try {
        const { id_extintor } = req.params;
        const extintorActualizado = await Extintor.findOneAndUpdate(id_extintor, req.body, { new: true });
        if (!extintorActualizado) {
            return res.status(404).json({ message: 'Extintor no encontrado', error: error.message });
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






module.exports = router;










