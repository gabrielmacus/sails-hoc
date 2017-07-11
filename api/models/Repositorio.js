/**
 * Created by Puers on 01/07/2017.
 */

module.exports = {

  attributes:
  {
    nombre:{type:"string",size:100,required:true},
    texto:{type:"text",size:800},
    ftp:
    {
      type:'json'
      /*
      *   host:{type:'string',required:true},
       puerto:{type:'integer',required:true,defaultsTo:21},
       usuario:{type:'string',required:true},
       contrasena:{type:'string',required:true},
       direccionWeb:{type:'string',required:true},
       carpetaDeGuardado:{type:'string',required:true}
       */
    },
     usuario:{model:'usuario'},
    filesystem:
    {
      type:'json'
      /*
      direccionWeb,carpetaDeGuardado
       */
    }
  }

};
