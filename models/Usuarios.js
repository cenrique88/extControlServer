
const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
  nombre_usuario: { type: String, required: true },
  password: { type: String, required: true },
  privilegios:{type: String, required: true},});

module.exports = mongoose.model('Usuarios', usuariosSchema);