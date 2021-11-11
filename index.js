const express= require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();
//dotenv es para la configuracion de entorno de desarrollo

//crear el servidor/aplicacion de express
const app = express();
//console.log(process.env);

//base de datos
dbConnection();

//directorio publico
app.use(express.static('public'))

//cors peticiones de cross domain
app.use(cors());

//lectura y parseo del body
app.use(express.json())


//rutas
app.use('/api/auth',require('./routes/auth'));


// //Get
// app.get('/',(req,res)=>{
    
//     res.status(404).json({
//         ok:true,
//         msg:'todo bien',
//         uid:1234

//     })
// })



app.listen(process.env.PORT ,()=>{
    console.log(`servidor corriendo en el puerto: ${process.env.PORT}`);
})  //escucha peticiones desde este puerto

 