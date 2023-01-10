// Importamos el modelo de usuario
const User = require('../models/UserModel')

// Importamos el helper para generar el token
const { JWTGenerator } = require('../helpers/jwt')

// Función para inicio de sesión
const loginUser = (async(req,res)=>{

    const {email, password} = req.body

    try {
        // Comporobamos que el usuario y su contraseña están en la base de datos
        const userCheck = await User.findOne({email,password})
        
        //Si el usuario existe, lo logueamos. Sino, mandamos un error para que introduzcan de nuevo email y contraseña.
        if(userCheck){
            // Generamos el token
            const token = await JWTGenerator(userCheck.id, userCheck.email)

            // Creamos un objeto con los datos del usuario logueado para poder utilizarlos durante su sesión
            const user = {
                email: userCheck.email,
                uid: userCheck._id
            }

            // Enviamos una respuesta satisfactoria
            res.status(201).json({
                ok:true,
                msg: 'Iniciando sesión',
                user,
                token
            })
        }else{
            res.status(400).json({
                ok:false,
                msg: 'El email o la contraseña no son válidos.'
            })
        }
        
    } catch (error) {
        console.log(error)
        // Enviamos un error inesperado en caso de error, ya que sería por parte del servidor
        return res.status(500).json({
            ok:true,
            msg: 'Se ha producido un error. Por favor, contacta con el administrador.'
        })
    }

})

// Función para renovar el token
const renewToken = (async(req,res)=>{

    // Recogemos el id y el correo electrónico del usuario directamente del requerimiento
    const {uid, email} = req;
    // Generar nuevo token
    const token = await JWTGenerator(uid,email)

    res.status(201).json({
        ok:true,
        msg: 'Renovación de token',
        user:{
            uid,
            email
        },
        token
    })
})

module.exports={
    loginUser,
    renewToken
}