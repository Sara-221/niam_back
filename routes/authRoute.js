const express = require('express');
const { check } = require('express-validator')
const { loginUser, renewToken } = require('../controllers/authController');
const { inputsValidator } = require('../middlewares/inputsValidator');
const { tokenValidator } = require('../middlewares/tokenValidator');

// Usamos el método Router de express para configurar las rutas
const router = express.Router()

// Ruta para iniciar sesión.
router.post('/login', [
        // Validaciones usando el método check de express-validator
        check('email','La dirección de correo electrónico no es válida').isEmail(),
        check('password')
            .isLength({min:6})
            .withMessage('La contraseña contiene un mínimo de 6 caracteres')
            .matches(/\d/)
            .withMessage('La contraseña contiene al menos un número')
            .matches(/[.,'!&*_]+/)
            .withMessage('La contraseña contiene al menos un carácter especial'),
        // mostrar los errores
        inputsValidator
    ], loginUser
)

// Uso y renovación de tokens para validar las conexiones de usuarios
router.get('/renew', tokenValidator, renewToken)

module.exports = router;