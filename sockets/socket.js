const { io } = require("../index");
const { comprobarJWT } = require("../helpers/jwt");
const {
  usuarioConectado,
  usuarioDesconectado,
} = require("../controllers/socket");

// Mensajes de Sockets
io.on("connect", async (client) => {
  //console.log(client.handshake.headers['x-token']);
  //Obtener el token, comprobar si es válido y obtener el uid
  const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);

  // Verificar autenticación
  if (!valido) {
    console.log("Cliente no autenticado");
    return client.disconnect();
  }

  // Cliente autenticado
  console.log("Cliente conectado");
  console.log(valido, uid);
  usuarioConectado(uid);

  // Ingresar al usuario a una sala en particular
  // Sala global, client.id, sala de socket.id
  client.join(uid);

  // Escuchar del cliente el mensaje-personal
  client.on("mensaje-personal", (payload) => {
    console.log(payload);
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    usuarioDesconectado(uid);
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje", payload);

    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });
});
