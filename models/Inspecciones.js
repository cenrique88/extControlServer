
const mongoose = require('mongoose');

const inspeccionesSchema = new mongoose.Schema({
    fecha_inspeccion: { type: Date, required: true },
    id_extintor: { type: String, required: true },
    cliente: {type: String, required: true},
   // estado_anterior: Schema.Types.Mixed,

});

module.exports = mongoose.model('Inspecciones', inspeccionesSchema);