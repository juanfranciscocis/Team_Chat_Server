/*
    path = api/login
 */


const {crearUsuario} = require("../controllers/auth");
const router = Router();

router.post('/new', crearUsuario);





module.exports = router;