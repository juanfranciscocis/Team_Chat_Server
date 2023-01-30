/*
    path = api/login
 */


const {crearUsuario} = require("../controllers/auth");
const { Router } = require('express');
const router = Router();

router.post('/new', crearUsuario);





module.exports = router;