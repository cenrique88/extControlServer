
const mongoose = require('mongoose');

const clientesSchema = new mongoose.Schema({
  nombre_cliente: { type: String, required: true },
  nombre_juridico: { type: String },
  direccion: { type: String },
  email: { type: String },  
  telefono: { type: Number },
  telefono1: { type: Number },
  telefono2: { type: Number },

});

module.exports = mongoose.model('Clientes', clientesSchema);