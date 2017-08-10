/**
 * Created by Puers on 03/08/2017.
 */





module.exports = {
  run : function(){
    sails.log.info("facebot.js: "+new Date());

    var titulo="Llego Autentica ❤! Te traemos las zapas mas copadas! Tenemos stock inmediato, consultanos al privado";
    var precio ="0";
    var groupUrl='https://www.facebook.com/groups/189905047763101/';

    var mainPath='C:\\Users\\Puers\\Documents\\autentica\\';
    var images =
      [
        mainPath+'1.huarapa-special.png',
        mainPath+'2.huarapa-placa-pink-01.png',
        mainPath+'3.huarapa-placa-metric-01-01.png',
        mainPath+'4.huarapa-placa-grace-01-01.png',
        mainPath+'5.huarapa-placa-french-bordo-01.png',
        mainPath+'6.huarapa-placa-aqua-01-01-01.png',
        mainPath+'7.huarapa-placa-french-negras-01.png',
        mainPath+'8.huarapa-placa-tiger-01.png'

      ];


    FacebookService.postImageSelenium(function(){



    },titulo,precio,images,groupUrl);


  }
};
