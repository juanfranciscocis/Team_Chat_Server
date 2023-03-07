/*
    path = api/login
 */


const {crearUsuario} = require("../controllers/auth");
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar_campos");
const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
    check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos
],crearUsuario);





module.exports = router;