require('./config/config')
const express = require('express');
const bodyParser = require('body-parser')
const app = express()


//middleware----- >
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



app.get('/usuario', function (req, res) {
    req
  res.json('get usuario')
})

app.post('/usuario', function (req, res) {
    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok:false,
            status: 'bad request'+' '+ 400,
            mensaje : 'algo salio mal, el nombre es necesario'
        })
    }else{
        res.json({persona :body})

    }
})

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    res.json({
        id
    })
})

app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
})

 
app.listen(3000,()=>{
    console.log(`escuchando el puerto ${process.env.PORT}`)
})

