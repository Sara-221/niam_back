const jwt = require('jsonwebtoken')

// Función para generar token cada vez que el usuario se loguee o el token caduque.
const JWTGenerator=(uid, email)=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid,email}

        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn:'24h'},
            (error,token)=>{
                if(error){
                    console.log(error)
                    reject('Error al generar el token')
                }
                resolve(token)
            }
        )
    })
}

module.exports={
    JWTGenerator
}

