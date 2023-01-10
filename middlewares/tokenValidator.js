const jwt=require('jsonwebtoken')

const tokenValidator=(req,res,next)=>{

    // Recogemos el token del header
    const token=req.header('x-token')

    // Comprobamos que haya token y después, si el que recogemos coincide con el que tenemos almacenado.
    if(!token){
        // Mandamos un error de privilegios
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const payload=jwt.verify(token, process.env.JWT_SECRET_KEY)
        // Enviamos el id y el nombre del usario en el req
        req.uid=payload.uid
        req.name=payload.name
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'El token no es válido'
        })
    }
    next()
}

module.exports={
    tokenValidator
}