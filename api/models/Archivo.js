/**
 * Created by Puers on 01/07/2017.
 */
module.exports = {

  attributes:
  {
    nombre:{type:"string",size:100,required:true},
    descripcion:{type:"text",size:800},
    peso:{type:'integer'},
    versiones:{type:'json'},
    repositorio:{model:"Repositorio",required:true},
  usuario:{model:'usuario'}

  }
};
