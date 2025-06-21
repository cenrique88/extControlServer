


const mongoose = require('mongoose');

const incidenciasSchema = new mongoose.Schema({
  id_incidencia: { type: String, required: true },
  nombre_cliente: { type: String, required: true },
  id_extintor: { type: String, required: true },
  fecha: { type: String, required: true },
  estado: { type: String, required: true },
  incidencia: { type: String, required: true },
});

module.exports = mongoose.model('incidencias', incidenciasSchema);

