/**
 * SeccionController
 *
 * @description :: Server-side logic for managing seccions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getArbol: function (req,res) {

    Seccion.find().exec(function (err, results) {
      if(err)
      {
        return res.negotiate(err);

      }


      SeccionService.cargarArbolSecciones(results,function(e){

        return res.send( e);

      });


    });


  },
  

};

