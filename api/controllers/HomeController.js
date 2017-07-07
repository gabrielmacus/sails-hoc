/**
 * Created by Gabriel on 30/06/2017.
 */
module.exports=
{
  index:function (req,res) {
/*
    var fs = require('fs');
    var youtubedl = require('youtube-dl');

    youtubedl.getInfo('https://www.youtube.com/watch?v=2b4zEYWJHRc', function(err, info) {
      if (err) throw err;

      console.log(info);
    });
*/

    Seccion.find({
      pertenece: [sails.config.idSeccionPrincipal]
    }).exec(function (err, secciones) {


      if(err)
      {
        return res.negotiate(err);

        //   throw err;
      }


      console.log(secciones);

      res.view('site/home/index', {layout: 'site/layouts/layout',bodyClasses:["portada"],secciones:secciones});


    });



      }
}
