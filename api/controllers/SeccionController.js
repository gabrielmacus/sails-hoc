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
  create:function (req,res) {
    var seccion = req.allParams();
    seccion.usuario=req.session.userId;
    Seccion.create(seccion,function (err, results) {
      if (err) {
        return res.negotiate(err);

      }
      res.json(results);
    });
  }


};

