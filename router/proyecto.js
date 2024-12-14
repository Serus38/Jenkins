const { Router } = require('express');
const Proyecto = require('..//models/Proyecto')
const { validationResult, check } = require('express-validator')

const router = Router();

//GET
router.post('/',[
    check('numero', 'invalid.numero').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('fechaInicio', 'invalid.fechaInicio').not().isEmpty(),
    check('fechaEntrega', 'invalid.fechaEntrega').not().isEmpty(),
    check('cliente', 'invalid.cliente').not().isEmpty(),
    check('tipoProyecto', 'invalid.tipoProyecto').not().isEmpty(),
    check('universidad', 'invalid.universidad').not().isEmpty(),
    check('etapaProyecto', 'invalid.etapaProyecto').not().isEmpty()
], async function(req, res) {

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array()});
        }

        const existeProyectoPorNumero = await Proyecto.findOne({numero: req.body.numero});
        if (existeProyectoPorNumero){
            return res.status(400).send('Ya existe numero para otro proyecto')
        }

        let proyecto = new Proyecto();
        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaInicio = req.body.fechaInicio;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.cliente = req.body.cliente;
        proyecto.tipoProyecto = req.body.tipoProyecto;
        proyecto.universidad = req.body.universidad;
        proyecto.etapaProyecto = req.body.etapaProyecto;
        proyecto.fechaCreacion = new Date();
        proyecto.fechaActualizacion = new Date();

        proyecto = await proyecto.save();
        res.send(proyecto);
    }catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al crear Proyecto');
    }
    
});

//GET
router.get('/', async function (req, res) {
    
    try {

        const proyectos = await Proyecto.find().populate([
            {
                path: 'cliente', select: ''
            },
            {
                path: 'etapa', select: ''
            },
            {
                path: 'tipoProyecto', select: ''
            },
            {
                path: 'universidad', select: ''
            }
        ]);

        res.send(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }
});

//PUT
router.put('/:proyectoId',[
    check('numero', 'invalid.numero').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('fechaInicio', 'invalid.fechaInicio').not().isEmpty(),
    check('fechaEntrega', 'invalid.fechaEntrega').not().isEmpty(),
    check('cliente', 'invalid.cliente').not().isEmpty(),
    check('tipoProyecto', 'invalid.tipoProyecto').not().isEmpty(),
    check('universidad', 'invalid.universidad').not().isEmpty(),
    check('etapaProyecto', 'invalid.etapaProyecto').not().isEmpty()

], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array() });
        }

        let proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto){
            return res.status(400).send('Proyecto no existe')
        }

        const existeProyectoPorNumero = await Proyecto.findOne({ numero: req.body.numero, _id:{ $ne: proyecto._id} });
        if (existeProyectoPorNumero) {
            return res.status(400).send('Ya existe el numero para otro proyecto')
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaInicio = req.body.fechaInicio;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.cliente = req.body.cliente;
        proyecto.tipoProyecto = req.body.tipoProyecto;
        proyecto.universidad = req.body.universidad;
        proyecto.etapaProyecto = req.body.etapaProyecto;
        proyecto.fechaActualizacion = new Date();

        proyecto = await proyecto.save();
        res.send(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar inventario');
    }
});

//GET by Id
router.get('/:proyectoId', async function(req, res) {
    try {
        const proyecto = await Proyecto.findById(req.params.proyectoId);
        if(!proyecto){
            return res.status(404).send('Proyecto no existe');
        }
        res.send(proyecto);
    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar proyecto')
    }
    
});

//DELETE
router.delete('/:proyectoId', async function(req, res) {
    try {
        const proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto) {
            return res.status(404).send('Proyecto no existe');
        }

        await Proyecto.findByIdAndRemove(req.params.proyectoId);
        res.send({ mensaje: 'Proyecto eliminado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al eliminar el proyecto');
    }
});

module.exports = router

