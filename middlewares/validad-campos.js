const { response } = require("express");
const { validationResult } = require("express-validator");

const validarcampos=(req,resp =response,next)=>{
    const errors=validationResult(req)
    console.log(errors);
    if(!errors.isEmpty()){return resp.status(400).json({
        ok:false,
        errors:errors.mapped()
    })}

next();

}


module.exports={
    validarcampos

}