const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res) => {
  const miID = req.uid;
  const mensajesDe = req.params.de;

  const todos = await Mensaje.find({
    $or: [
      { de: miID, para: mensajesDe },
      { de: mensajesDe, para: miID },
    ],
  }).sort({ createdAt: "desc" });

  res.json({
    ok: true,
    mensajes: todos,
  });
};

module.exports = {
  obtenerChat,
};
