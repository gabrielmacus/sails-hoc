/**
 * Created by Puers on 03/08/2017.
 */


var groups=
  [

    'https://www.facebook.com/groups/189905047763101/',
    'https://www.facebook.com/groups/1400218443590187/',
    'https://www.facebook.com/groups/302488623479279/',
    'https://www.facebook.com/groups/415476081830592/'
  ];
var loop=0;

module.exports = {
  run : function(){
    sails.log.info("facebot.js: "+new Date());


    if(loop==groups.length)
    {
      loop=0;
    }

    var groupUrl = groups[loop];

    loop++;
    var titulo="¿Te copan nuestras zapas? Hablanos al privado, tenemos stock!";
    var precio ="0";



    var mainPath='C:\\Autentica\\';
    var images =
      [
        mainPath+'wt_french_bordo_compressed.jpg',
        mainPath+'wt_special_compressed.jpg',
        mainPath+'wt_pink_compressed.jpg',
        mainPath+'wt_metric_compressed.jpg',
        mainPath+'wt_french_negra_compressed.jpg'

      ];

    FacebookService.postImageSelenium(function(){



    },titulo,precio,images,groupUrl);


  }
};
