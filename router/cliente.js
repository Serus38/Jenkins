const { Router } = require('express');
const Cliente = require('../models/Cliente');
const { validationResult , check } = require ('express-validator');

const router = Router();

//GET
router.get('/', async function (req, res) {

    try {
        const cliente = await Cliente. find();
        res.send(cliente);
    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }
});

//POST
router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let cliente = new Cliente();
        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fechaCreacion = new Date;
        cliente.fechaActualizacion = new Date;

        cliente = await cliente.save();
        res.send(cliente);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear Cliente ')
    }
    
});

//PUT
router.put('/:clienteId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array()});
        }

        console.log(req.params.clienteId);
        let cliente = await Cliente.findById(req.params.clienteId);

        if (!cliente){
            return res.status(400).send('Cliente no existe');
        }

        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fechaActualizacion = new Date;

        cliente = await cliente.save();
        res.send(cliente);

        res.status(200).json({ mensaje: 'Cliente actualizado' });
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar cliente');
    }
    
});

// DELETE
router.delete('/:clienteId', async (req, res) => {
    try {
        const { clienteId } = req.params;
        const cliente = await Cliente.findByIdAndDelete(clienteId);

        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar el cliente');
    }
});

module.exports = router;