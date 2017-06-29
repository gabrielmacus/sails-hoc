/**
 * Created by Puers on 28/06/2017.
 */


module.exports = {

  attributes:
  {
    nombre:{type:"string",size:100},
    apellido:{type:"string",size:100},
    email:{type:"string",size:100},
    contrasena:{type:"string", size:150},
    nivel:{type:"integer",defaultsTo:1}
  }

};
