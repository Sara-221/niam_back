const { validationResult } = require("express-validator")


const inputsValidator=(req,res,next)=>{

    // Traemos los errores del authRoute, que se encuentran en el req
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        // Si hay errores, enviamos un bad request (error del cliente)
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    next()
}

module.exports = {
    inputsValidator
}