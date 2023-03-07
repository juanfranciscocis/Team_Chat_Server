const {response} = require('express');
const { validationResult, body } = require('express-validator');
const Usuario = require('../models/usuario');

const crearUsuario = async (req,res=response) => {

    const {email} = req.body;

    try{

        const existeEmail = await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);
        await usuario.save();

        res.json({
            ok: true,
            msg: 'Crear usuario!!!',
            usuario, 
        })



    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }







}

module.exports = {
    crearUsuario
}