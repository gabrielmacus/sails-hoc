/**
 * Created by Puers on 03/08/2017.
 */





module.exports = {
  run : function(){
    sails.log.info("facebot.js: "+new Date());

    var titulo="Llego Autentica ❤! Te traemos las zapas mas copadas! Tenemos stock inmediato, consultanos al privado";
    var precio ="0";
    var groupUrl='https://www.facebook.com/groups/415476081830592/';
    var images =
      [
        'C:\\Users\\Gabriel\\Pictures\\Autentica\\1.huarapa-special.png',
        'C:\\Users\\Gabriel\\Pictures\\Autentica\\2.huarapa-placa-pink-01.png',
        'C:\\Users\\Gabriel\\Pictures\\Autentica\\3.huarapa-placa-metric-01-01.png',
        'C:\\Users\\Gabriel\\Pictures\\Autentica\\4.huarapa-placa-grace-01-01.png',
        'C:\\Users\\Gabriel\\Pictures\\Autentica\\5.huarapa-placa-french-bordo-01.png',
        'C:\\Users\\Gabriel\\Pictures\\Autentica\\6.huarapa-placa-aqua-01-01-01.png',
        'C:\\Users\\Gabriel\\Pictures\\Autentica\\7.huarapa-placa-french-negras-01.png',
        'C:\\Users\\Gabriel\\Pictures\\Autentica\\8.huarapa-placa-tiger-01.png'

      ];


    FacebookService.postImageSelenium(function(){



    },titulo,precio,images,groupUrl);


  }
};
