const express = require('express')
const { DBconnect } = require('./database/configDB')
const cors = require('cors')

// Importar dotenv para poder usar las variables de entorno
require('dotenv').config()

// Configuración de servidor express
const app = express()

// Configuración del puerto
const port = process.env.PORT

// Conexión a la base de datos
DBconnect()

// CORS (uso simple, aplicación abierta)
app.use(cors())

// Configuración de la carpeta estática (public)
app.use(express.static(__dirname+'/public'))

// Parsear JSON
app.use(express.json())

// Rutas
// Ruta auth
app.use('/api/auth', require('./routes/authRoute'))

// Ruta recipes
app.use('/api/recipes', require('./routes/recipesRoute'))

// Aplicación a la escucha del puerto
app.listen(port,()=>{console.log(`Servidor a la escucha del puerto ${port}`)})