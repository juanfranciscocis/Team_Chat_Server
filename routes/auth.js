/*
    path = api/login
 */


const {crearUsuario, login, renewToken} = require("../controllers/auth");
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
    check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos
],crearUsuario);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
    check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos
],login);

router.get('/renew', [
    validarJWT,

],renewToken);




module.exports = router;