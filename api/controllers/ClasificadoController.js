/**
 * Created by Puers on 29/06/2017.
 */
/**
 * Created by Puers on 28/06/2017.
 */

module.exports=
{

  'save':
  function (req,res) {

    switch(req.method)
    {
      case "POST":


            break;


      case "GET":

        Seccion.find(
          {

          },function (err,results) {



            if(err)
            {
              return res.negotiate(err);

              //   throw err;
            }

            SeccionService.cargarArbolSecciones(results,
            function (arbol) {

              arbol=arbol.filter(
                function (el) {

                 return el.id==sails.config.idSeccionPrincipal
                }
              );

              arbol  = arbol[0].secciones;
              
              res.view('site/posts/guardar', {layout: 'site/layouts/layout',bodyClasses:["clasificado-guardado"],secciones:arbol});

            })

          }
        );





       break;

    }


  }

}
