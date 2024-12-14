const { Schema, model } = require('mongoose')

const ClienteSchema = Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true }

});

module.exports = model('Cliente', ClienteSchema);