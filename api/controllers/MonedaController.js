/**
 * Created by Puers on 29/06/2017.
 */
/**
 * Created by Puers on 28/06/2017.
 */

const pager = require('sails-pager');
module.exports=
{


  find:function(req,res){

    var elementosAsociados=[];
    var perPage=500;
    var currentPage= (req.param("p")&& !isNaN(1*req.param("p")))?req.param("p") : 1;
    var conditions={};

    pager.paginate(Moneda, conditions, currentPage, perPage, elementosAsociados).then(function(records){

      res.json(records);


    }).catch(function(err){

      res.serverError(res.i18n("errorRecuperarMonedas"));

    });


  }


}

