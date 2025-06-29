
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspeccionesSchema = new mongoose.Schema({
    fecha_inspeccion: { type: Date, required: true },
    id_extintor: { type: String, required: true },
    cliente: {type: String, required: true},
    estado_anterior: {type: Schema.Types.Mixed, default: {}, required: true},

});

module.exports = mongoose.model('Inspecciones', inspeccionesSchema);