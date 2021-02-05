const mongoose = require('mongoose');
let Schema     = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');
let rolesValidos = {
    values : ['USER_ROLE','ADMIN_ROLE'],
    message :'{VALUE} no es un rol valido'
}



let usuarioSchema = new Schema({
    nombre :{ 
     type : 'string',
     required : [true,'el nombre es necesario']},
    email :{
        type : 'string',
        required : [true,'el correo es necesario'],
        unique:true
    },
    password :{
        type : 'string',
        required : [true,'el clave unica de usuario es necesaria']
    },
    img :{
        required :false,
        type :'string'
    },
    roles :{
        type :'string',
        default : 'USER_ROLE',
        enum : rolesValidos
    },
    estado :{
        type : 'boolean',
        default: true
    },
    google :{
        default :false,
        type : 'boolean'
    }
    
})

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userOBjecto = user.toObject();
    delete userOBjecto.password
    return userOBjecto

}

usuarioSchema.plugin( uniqueValidator,{message :'Error, el {PATH} debe ser unico'})


module.exports =  mongoose.model('usuario',usuarioSchema)