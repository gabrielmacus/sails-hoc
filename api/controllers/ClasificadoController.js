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

               console.log("After finish loop");

               next();
             });


          },function () {

           console.log("Finish loop");
           callback();

         });


       }
        else
       {
         callback();
       }

      },
      function(callback) {
                        console.log("SADSDA");
        console.log(uploadedArchivos);
        if(uploadedArchivos.length>0)
        {
          clasificado.archivos=[];
          for(var k in uploadedArchivos)
          {

            clasificado.archivos.push(uploadedArchivos[k].id);
          }

        }
        console.log(clasificado);

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
  ,
  find:function(req,res)
  {


    var perPage = 50;
    var currentPage =(req.param("p"))?req.param("p"):1;
    try
    {
      var conditions =(req.param("where"))?JSON.parse(req.param("where")):{};
    }
    catch (e)
    {
      var conditions ={};
    }

    var elementosAsociados=[{name: 'archivos', query: {}}];

    //Cargo los repositorios
    Repositorio.find({}, function (err, repositorios) {



      if(err)
      {
        return res.negotiate(err);
      }

      //Using Promises
      pager.paginate(Clasificado, conditions, currentPage, perPage, elementosAsociados).then(function(records){


        records.data.map(
          function(element){

            console.log(element);
            if(element.avatar)
            {
              var repositorio= repositorios.filter(
                function(el){

                  return el.id== element.avatar.repositorio;
                }
              )[0];

              if(element.archivos)
              {
                element.archivos.forEach(
                  function (valor,clave) {



                  }
                );
              }


            }

            return element;
          }
        );




        res.json(records);


      }).catch(function(err) {

        res.negotiate(err);

      });

    });


  }
}
