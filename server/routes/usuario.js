
const express = require('express');

const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/Usuario');

app.get('/usuario', function (req, res) {


    let limite = req.query.limite || 5;
    limite = Number(limite)
    let from = req.query.from     || 0;
    from = Number(from)
    Usuario.find({estado:true})
    .skip(from)
    .limit(limite)
    .exec((err, usuarios) => {
        if(err ) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        Usuario.count({estado:true},(err,cantidad)=>{

            res.json({
                ok:true,
                status : 200,
                data :{ usuarios},
                totalUsuarios:cantidad
    
            })

        })
       
    })
  })
  
  app.post('/usuario', function (req, res) {
      let body = req.body
      let usuario = new Usuario({
          nombre: body.nombre,
          email: body.email,
          password: bcrypt.hashSync(body.password,10) ,
          roles: body.role

      })

      usuario.save((err,usuarioDB) => {

        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }
        usuarioDB.password = null
        return res.json({
            ok:true,
            usuario : usuarioDB
        })
      })


   
  })
  
  app.put('/usuario/:id', function (req, res) {
      let id = req.params.id
      let body = _.pick(req.body,['nombre','email','img','estado','roles']);

      

      Usuario.findByIdAndUpdate(id, body,{new :true,runValidators:true},(err,usuarioDB) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        return res.json({
            ok:true,
            usuario : usuarioDB
        })
      })
    
  })
  
  app.delete('/usuario/:id', function (req, res) {
      let id = req.params.id;

      Usuario.findByIdAndUpdate(id,{estado:false},{new:true,runValidators:true},(err,usuarioActualizado) => {
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }
        return res.json({
            ok:true,
            usuario : usuarioActualizado
        })
      })
      })

    




  module.exports = app;