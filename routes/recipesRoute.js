const {Router} = require('express')
const { tokenValidator } = require('../middlewares/tokenValidator')
const { getRecipes, createRecipe, editRecipe, deleteRecipe } = require('../controllers/recipesController')
const { check, oneOf } = require('express-validator')
const { inputsValidator } = require('../middlewares/inputsValidator')
inputsValidator

// Configuramos las rutas usando el método Router de express
const router=Router()

// Ruta para recoger las recetas
router.get('/',
    tokenValidator,
    getRecipes)

// Ruta para crear una nueva receta
router.post('/',
    // validación del token
    tokenValidator,
    [
    // validación de inputs del usuario
    check('name','El nombre de la receta es obligatorio').not().isEmpty(),
    check('category')
        .not().isEmpty()
        .withMessage('La categoría es obligatoria')
        .isIn(['aperitivo', 'desayuno', 'ensalada', 'principal', 'sopa', 'postre'])
        .withMessage('La categoría no es válida'),
    // mostrar los errores
    inputsValidator
    ], 
    oneOf([
        check('url').isEmpty(),
        check('url').isURL(),
        ],"Omite el enlace o introduce uno válido."),
    inputsValidator
    ,createRecipe)

// Ruta para editar una receta
router.put('/:id',
    tokenValidator,
    [
    // Revalidación de inputs del usuario
    check('name','El nombre de la receta es obligatorio').not().isEmpty(),
    check('category')
        .not().isEmpty()
        .withMessage('La categoría es obligatoria')
        .isIn(['aperitivo', 'desayuno', 'ensalada', 'principal', 'sopa', 'postre'])
        .withMessage('La categoría no es válida'),
    check('url', 'El enlace no es válido').isURL(),
    // mostrar los errores
    inputsValidator
    ],
    editRecipe)

// Ruta para eliminar una receta
router.delete('/:id',tokenValidator,deleteRecipe)

module.exports = router;