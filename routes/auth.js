const{Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validad-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();
//crear un nuevo usuario
router.post('/new',[
    check('name','El nombre es obligatorio').not().notEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarcampos
],crearUsuario)

//login de usuario
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarcampos
],loginUsuario)
//lvalidar y revalidar token
router.post('/renew',validarJWT,revalidarToken)

module.exports =router;