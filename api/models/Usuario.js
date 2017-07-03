/**
 * Created by Puers on 28/06/2017.
 */

const crypto = require('crypto');
module.exports = {

  attributes:
  {
    nombreUsuario:{type:"string",size:50,required:true,unique:true},
    nombre:{type:"string",size:100,required:true},
    apellido:{type:"string",size:100,required:true},
    email:{type:"string",size:100,required:true,unique:true},
    contrasena:{type:"string", size:150,required:true},
    nivel:{type:"integer",defaultsTo:1},
    estado:{type:"integer", enum: [1,2],defaultsTo:1}, //1:no activo 2:activo
    codigoConfirmacion:{type:"string",size:100},
    facebookId:{type:"string"},
    googleId:{type:"string"}
  },
  beforeCreate:function (values,callback) {

    var hash=crypto.createHash(sails.config.hashAlgo);
    hash.update(values.contrasena);
    values.contrasena=hash.digest('hex');

    //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
    callback();

  },
  afterCreate:function(values,callback)
  {
    var hash=crypto.createHash(sails.config.hashAlgo);
    hash.update(values.id);
    values.codigoConfirmacion=hash.digest('hex');

    Usuario.update({id:values.id},values,function(err,result)
    {
      if(err)
      {
        return res.negotiate(err);

      }

      delete values.codigoConfirmacion;
      delete values.contrasena;

      callback();


    });


  }

};
