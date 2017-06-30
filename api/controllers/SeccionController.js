/**
 * SeccionController
 *
 * @description :: Server-side logic for managing seccions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  arbol: function (req,res) {

    SeccionService.cargarArbolSecciones(function(e){


      return res.send( e);
    });


  }

};

