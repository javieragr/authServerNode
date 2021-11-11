const {response}= require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT}= require('../helpers/jwt');
// const { validationResult } = require('express-validator');

const crearUsuario=async(req,resp = response)=>{
    // nombre: .not().isEmpty()
    const errors=validationResult(req)
    // console.log(errors);
    // if(!errors.isEmpty()){return resp.status(400).json({
    //     ok:false,
    //     errors:errors.mapped()
    // })}
    const{email,name,password}=req.body;
    try {
    //verificar el email
        const usuario = await Usuario.findOne({email:email});
        if (usuario) {
            return resp.status(400).json({
                ok:false,
                msg:'El correo ya existe en la BD'
            });
        }

        //crear usuario con el modelo
       const dbUser= new Usuario(req.body)
       
    //hash password
        const salt= bcrypt.genSaltSync();
        dbUser.password=bcrypt.hashSync(password,salt)

    //generar el json web token
    console.log('userid:',dbUser.id,' userName:',dbUser.name);
        const token = await generarJWT(dbUser.id,dbUser.name)

        //crear usuario en BD
        await dbUser.save();
        
          //generar response  exitosa
          return resp.status(201).json({
              ok:true,
              uid:dbUser.id,
              msg:'Se a creado el usuario Correctamente',
              name,
              email,
              token
          })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false, 
            msg:'Hable con el admin'
    
        })
    }
   




  
    
}
//El response es para obtener tipado 
const loginUsuario=async(req,resp= response)=>{

    // const errors=validationResult(req)
    // console.log(errors);
    // if(!errors.isEmpty()){return resp.status(400).json({
    //     ok:false,
    //     errors:errors.mapped()
    // })}

    const{email,password}= req.body;
    try {
        
        const dbUser = await Usuario.findOne({email:email})
        if (!dbUser) {
            return resp.status(400).json({
                ok:false,
                msg:'correo no existe'
            })
        }
        //validamos contrasena
        const validPasswor= bcrypt.compareSync(password,dbUser.password)
        if (!validPasswor) {
            return resp.status(400).json({
                ok:false,
                msg:'Password no valido'
            })
        }
        //generar el jwt
        const token = await generarJWT(dbUser.id,dbUser.name)
        //respuesta del servicio login exitoso
        return resp.json({
            ok:true,
            uid:dbUser.id,
            name:dbUser.name,
            email,
            token:token
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg:'Hable con el admin'

        })
    }

   
}

const revalidarToken =async(req,resp)=>{

// const token = req.header('x-token')
// if (!token) {
//     return resp.status(401).json({
//         ok:false,
//         msg:'error en el token'

//     })
// }
const {uid}= req;
const dbUser = await Usuario.findById(uid)
console.log('dbUser:',dbUser,'uuid:',uid);
const token = await generarJWT(uid,dbUser.name,dbUser.email)
    return resp.json({
        ok:true,
        uid,
        name:dbUser.name,
        email:dbUser.email,
        token
      //  email
        //token

    })
}


module.exports={
    crearUsuario,
    revalidarToken,
    loginUsuario

}