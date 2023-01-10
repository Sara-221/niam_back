const express = require('express');
const { check } = require('express-validator')
const { loginUser, renewToken } = require('../controllers/authController');
const { inputsValidator } = require('../middlewares/inputsValidator');
const { tokenValidator } = require('../middlewares/tokenValidator');

// Usamos el método Router de express para configurar las rutas
const router = express.Router()

// Ruta login para iniciar sesión.
router.post('/login', [
        // Validaciones usando el método check de express-validator
        check('email','Introduce una dirección de correo electrónico válida').isEmail(),
        check('password')
            .isLength({min:6})
            .withMessage('La contraseña debe tener un mínimo de 6 caracteres')
            .matches(/\d/)
            .withMessage('La contraseña debe contener al menos un número')
            .matches(/[.,'!&*_]+/)
            .withMessage('La contraseña debe contener al menos un carácter especial'),
        inputsValidator
    ], loginUser
)

// Uso y renovación de tokens para validar las conexiones de usuarios
router.get('/renew', tokenValidator, renewToken)

module.exports = router;