require('./config/config')
const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');
const colors   = require('colors');
const bodyParser = require('body-parser')
const app = express()



 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use( require('./routes/usuario'))


const llamarBaseDatos = async()=>{
    
await mongoose.connect(process.env.URLDB
    ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
},(err)=>{
    if(err) throw err;
    console.log('base de datos online'.red)

})
}
llamarBaseDatos()
 
app.listen(process.env.PORT,()=>{
    console.log(`escuchando el puerto ${process.env.PORT}`)
})

