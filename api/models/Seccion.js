/**
 * Created by Puers on 28/06/2017.
 */

module.exports = {

  attributes:
  {
    nombre:{type:"string",size:100},
    pertenece:{type:"integer",defaultsTo:0},
    imagen:{type:"text"},
    usuario:{model:"usuario"},
    principal:{type:"boolean",defaultsTo:false}
  }

};
