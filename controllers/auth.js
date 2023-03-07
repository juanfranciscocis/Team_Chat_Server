const {response} = require('express');
const { validationResult, body } = require('express-validator');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req,res=response) => {

    const {email, password} = req.body;

    try{

        const existeEmail = await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //Numero de vueltas que se le da al algoritmo
        usuario.password = bcrypt.hashSync(password, salt); //Encriptar la contraseña
        //Guardar usuario en la base de datos
        await usuario.save();

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            //msg: 'Crear usuario!!!',
            usuario, 
            token
        })



    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }







}

const login = async (req,res=response) => {

    const {email, password} = req.body;

    try{
        //validar email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //validar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            //msg:'Crear usuario!!!',
            usuarioDB, 
            token
        })




    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }





}

const renewToken = async (req,res=response) => {


    //Leer el token que viene gracias al middleware validarJWT, quien toma el token del header y lo transforma en el uid
    const uid = req.uid;
    //Generar el JWT
    const token = await generarJWT(uid);
    //Obtener el usuario por UID
    const usuarioDB = await Usuario.findById(uid);



    res.json({
        ok: true,
        //msg:'Crear usuario!!!',
        usuarioDB, 
        token
    })



}


module.exports = {
    crearUsuario,
    login,
    renewToken
}