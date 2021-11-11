const mongoose = require('mongoose');


const dbConnection=async()=>{

    // try {
    //     await mongoose.connect(process.env.dbConnection,{
    //         useNewUrlParser:true,
    //         useUnifiedTopology:true,
    //         useCreateIndex:true
    //     });
    //     console.log('BD online');
        
    // } catch (error) {
    //     console.log(error);
    //     throw new Error('Error al inicializar la BD');
    // }



   
        try {
            await mongoose.connect(process.env.BD_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                
            });
    
            console.log('MongoDB connected!!');
        } catch (err) {
            console.log('Failed to connect to MongoDB', err);
        }
    
}
module.exports={
    dbConnection
}