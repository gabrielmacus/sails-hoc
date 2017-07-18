/**
 * Created by Puers on 29/06/2017.
 */
module.exports = {

  attributes:
  {
    titulo:{type:"string",size:150},
    texto:{type:"text",size:800},
    seccion: {
      model: 'Seccion'
    },
   // moneda:{model:"Moneda"},
    monto:{type:"float",required:true},
    archivos:{collection:'archivo'},
      estado:{type:"integer", enum: [1,2,3,4],defaultsTo:1}, //1:pendiente 2:borrador 3:publicado 4:rechazado
  }

};
