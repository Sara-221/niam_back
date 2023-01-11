// Importamos el modelo de receta
const Recipe  = require('../models/RecipeModel')


// Recoger todas las recetas
const getRecipes = async (req,res)=>{
    
    try {
        // Almacenamos todas las recetas en la variable recipesList
        const recipesList = await Recipe.find()

        // Enviamos la lista de recetas en la respuesta
        res.status(200).json({
            ok:true,
            msg: 'Leyendo recetas',
            recipesList
        })

    } catch (error) {
        // Error del servidor
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Contacta con el administrador'
        })
    }
}


// Crear receta y guardarla en la base de datos
const createRecipe = async (req,res)=>{
    // Desestructuramos del req.body los datos introducidos por el usuario
    const {name, category, time, url, ingredients, method, notes} = req.body

    try {

        // Guardamos la receta en la base de datos
        const recipe = new Recipe({name, category,time,url, ingredients, method,notes})
        const newRecipe = await recipe.save()

        // Enviamos la nueva receta en la respuesta
        res.status(200).json({
            ok:true,
            msg: 'Receta creada',
            newRecipe
        })

    } catch (error) {
        // Error del servidor
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado. Contacta con el administrador.'
        })
    }
}

// Editar una receta y actualizarla en la base de datos
const editRecipe = async (req,res)=>{

    try {
        const recipeID = req.params.id
        // Comprobamos que el id existe, y si es el caso, actualizamos la receta.
        let updRecipe = await Recipe.findById(recipeID)
        
        if(updRecipe!=null){
            let updRecipe = await Recipe.findByIdAndUpdate(recipeID, req.body, {new:true})

            // Enviar actualización en la respuesta
            res.status(200).json({
                ok:true,
                msg: 'Receta editada',
                updRecipe
            })

        }else{
            // Si no, enviamos un bad request.
            res.status(404).json({
            ok:false,
            msg: 'Error de cliente, receta no encontrada.'
        })
        }
        
    } catch (error) {
        // Error del servidor
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Contacta con el administrador'
        })
    }
}

// Eliminar una receta
const deleteRecipe = async (req,res)=>{
    try {
        const recipeID = req.params.id
        const dltRecipe = await Recipe.findById(recipeID)
        // Comprobamos que el id existe, y si es el caso, eliminamos la receta.
        if(dltRecipe!=null){
            let dltRecipe = await Recipe.findByIdAndRemove(recipeID, req.body)

            // Enviar actualización en la respuesta
            res.status(200).json({
                ok:true,
                msg: 'Receta eliminada',
                dltRecipe
            })

        }else{
            // Si no, enviamos un bad request.
            res.status(404).json({
            ok:false,
            msg: 'Error de cliente, receta no encontrada.'
        })
        }

        
    } catch (error) {
        // Error del servidor
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Contacta con el administrador'
        })
    }
}

// Exportaciones
module.exports={
    getRecipes,
    createRecipe,
    editRecipe,
    deleteRecipe
}