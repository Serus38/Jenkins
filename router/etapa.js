const { Router } = require('express');
const Etapa = require('../models/Etapa');
const { validationResult , check } = require ('express-validator');

const router = Router();

//GET
router.get('/', async function (req, res) {

    try {
        const etapa = await Etapa. find();
        res.send(etapa);
    } catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }
});

//POST
router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array()});
        }

        let etapa = new Etapa();
        etapa.nombre = req.body.nombre;
        etapa.fechaCreacion = new Date;
        etapa.fechaActualizacion = new Date;

        etapa = await etapa.save();
        res.send(etapa);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear Cliente ')
    }
    
});

//PUT
router.put('/:etapaId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array()});
        }

        console.log(req.params.etapaId);
        let etapa = await Etapa.findById(req.params.etapaId);

        if (!etapa){
            return res.status(400).send('Etapa no existe');
        }

        etapa.nombre = req.body.nombre;
        etapa.fechaActualizacion = new Date;

        etapa = await etapa.save();
        res.send(etapa);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar etapa');
    }
    
});

// DELETE
router.delete('/:etapaId', async (req, res) => {
    try {
        const { etapaId } = req.params;
        const etapa = await Etapa.findByIdAndDelete(etapaId);

        if (!etapa) {
            return res.status(404).json({ mensaje: 'Etapa no encontrado' });
        }

        res.status(200).json({ mensaje: 'Etapa eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar etapa');
    }
});

module.exports = router;