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
    archivos:{collection:'archivo'}
  }

};
