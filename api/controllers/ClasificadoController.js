/**
 * Created by Puers on 29/06/2017.
 */
/**
 * Created by Puers on 28/06/2017.
 */
const async = require("async");
const pager = require('sails-pager');
const asyncLoop = require('node-async-loop');

module.exports=
{

  guardar:function (req,res) {

    var clasificado=req.allParams();

    console.log(clasificado);
    var uploadedArchivos=[];


    async.waterfall([
      function(callback) {

       if(clasificado.archivos)
       {

         asyncLoop(clasificado.archivos,function (item,next) {

           ArchivoService.guardar(item,req.session.userId,req.param("repositorio"),
             function (result) {

               if(result.error)
               {
               res.json(result.code,res.i18n(result.error));

               }
               uploadedArchivos.push(result);


               next();
             },function () {

               callback();

             });


         });


       }
        else
       {
         callback();
       }

      },
      function(callback) {

        if(uploadedArchivos.length>0)
        {
          clasificado.archivos=[];
          for(var k in uploadedArchivos)
          {

            clasificado.archivos.push(uploadedArchivos[k].id);
          }

        }

        delete clasificado.repositorio;

        if(req.param("id"))
        {

          Clasificado.update({id:req.param("id")},clasificado,function(err,results){

            console.log(err);
            if(err)
            {
              return res.serverError(res.i18n("clasificado.errorActualizacion"));

            }

            res.json(results);


          });
        }
        else
        {
          Clasificado.create(clasificado,function(err,results){

            if(err)
            {
              return res.serverError(res.i18n("clasificado.errorCreacion"));

            }

            res.json(results);


          });
        }



      }
    ], function (err, result) {
      // result now equals 'done'
    });






  }

}
