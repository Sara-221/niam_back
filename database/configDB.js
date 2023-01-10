const mongoose = require('mongoose');

// Configuramos la función que establece la conexión con la base de datos
const DBconnect=async()=>{
    try {
        // Seteamos el modo estricto de mongoose para que la configuración no nos dé errores
        mongoose.set('strictQuery',true)
        
        // Conectamos usando mongoose
        await mongoose.connect(process.env.URI_DB)
        console.log('Conectado a la base de datos')

    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la base de datos')
    }
}

module.exports = {
    DBconnect
}