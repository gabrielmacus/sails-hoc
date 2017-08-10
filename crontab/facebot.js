/**
 * Created by Puers on 03/08/2017.
 */


var groups=
  [
    'https://www.facebook.com/groups/415476081830592/',
    'https://www.facebook.com/groups/189905047763101/',
    'https://www.facebook.com/groups/1400218443590187/',
    'https://www.facebook.com/groups/302488623479279/'
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
    var titulo="¿Con cuál te quedas? Tenemos stock inmediato de las zapas mas copadas, consultanos al privado";
    var precio ="0";



    var mainPath='C:\\Users\\Puers\\Documents\\autentica\\';
    var images =
      [
        mainPath+'wt_french_bordo_compressed.jpg',
        mainPath+'wt_tiger_compressed.jpg',
        mainPath+'wt_special_compressed.jpg',
        mainPath+'wt_pink_compressed.jpg',
        mainPath+'wt_metric_compressed.jpg',
        mainPath+'wt_grace_compressed.jpg',
        mainPath+'wt_french_negra_compressed.jpg',
        mainPath+'wt_aqua_compressed.jpg'

      ];

    FacebookService.postImageSelenium(function(){



    },titulo,precio,images,groupUrl);


  }
};
