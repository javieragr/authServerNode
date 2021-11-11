const { response } = require("express")
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");

const validarJWT=(req,resp=response,next)=>{

    const token = req.header('x-token')
    if (!token) {
        return resp.status(401).json({
            ok:false,
            msg:'error en el token'
    
        })
    }

    try {
        
        const {uid,name}=jwt.verify(token,process.env.SECRET_JWT_SEED);
        req.uid=uid;
        req.name=name;

        
        ///console.log(uid,name);
        

    } catch (error) {
        
        return resp.status(401).json({
            ok:false,
            msg:'token no valido'

        })
    }

    next();

}

module.exports={
    validarJWT

}