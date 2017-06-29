/**
 * Created by Puers on 28/06/2017.
 */

const crypto = require('crypto');


module.exports = {

  attributes:
  {
    nombreUsuario:{type:"string",size:50,required:true},
    nombre:{type:"string",size:100,required:true},
    apellido:{type:"string",size:100,required:true},
    email:{type:"string",size:100,required:true},
    contrasena:{type:"string", size:150,required:true},
    nivel:{type:"integer",defaultsTo:1}
  },
  beforeCreate:function (values,callback) {

    var hash=crypto.createHash(sails.config.hashAlgo);
    hash.update(values.contrasena);
    values.contrasena=hash.digest('hex');

    //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
    callback();

  }

};
