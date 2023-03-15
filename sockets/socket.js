const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');



// Mensajes de Sockets
io.on('connection', async (client) => {

    //console.log(client.handshake.headers['x-token']);
    
    const[valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    if(!valido){
        console.log('Cliente no autenticado');
        return client.disconnect();
    }
    console.log('Cliente conectado');
    console.log(valido, uid);
    usuarioConectado(uid);

    

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
