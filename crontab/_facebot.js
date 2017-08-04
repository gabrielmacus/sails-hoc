/**
 * Created by Puers on 03/08/2017.
 */


var templateMsg='Auténtica Moda Femenina te trae las {model} ❤ ! Tenemos este y muchos más modelos. Consultános por precios y los distintos medios de pago al privado. Disponibles para entrega inmediata. Visita nuestra Fan Page https://www.facebook.com/Aut%C3%A9ntica-Moda-Femenina-1032665866833207';
var posts = [
  {

    url:'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/20621239_1091451454287981_1387376823170584035_n.jpg?oh=5c1c95473a0cae37f02fa7d19c0d46d8&oe=5A001B20',
    msg:'Huarapa Special',
    image: "C:\\Users\\Puers\\Documents\\autentica\\1.huarapa-special.png"

  },
  {

    url:'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/20476454_1091451520954641_6324860121162612055_n.jpg?oh=c3f3a8e7bf592853e86fcfce4f00988b&oe=59F10B21',
    msg:'Huarapa Pink',
    image:"C:\\Users\\Puers\\Documents\\autentica\\2.huarapa-placa-pink-01.png"
  }

  ,
  {

    url:'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/20431323_1091451434287983_3011623863069186055_n.png?oh=4d58579f0ab12d27205c6bf37a57a29f&oe=59F77265',
    msg:'Huarapa Metric',
    image:"C:\\Users\\Puers\\Documents\\autentica\\3.huarapa-placa-metric-01-01.png"
  }

  ,
  {

    url:'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/18033976_1091451607621299_4577939987216734328_n.jpg?oh=b465b51feec89f82eaca11af0240d761&oe=59FBF898',
    msg:'Huarapa Grace',
    image:"C:\\Users\\Puers\\Documents\\autentica\\4.huarapa-placa-grace-01-01.png"
  }
  ,
  {

    url:'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/20476276_1091451620954631_9194941121019961461_n.png?oh=cf4591f3e9c76f7db022d252795e65cc&oe=5A366AE3',
    msg:'Huarapa French Bordó',
    image:"C:\\Users\\Puers\\Documents\\autentica\\5.huarapa-placa-french-bordo-01.png"
  }
  ,
  {

    url:'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/20479670_1091451684287958_2010771690179790330_n.png?oh=d97f829fa883c9165eda9bc2f5523170&oe=5A322986',
    msg:'Huarapa Aqua',
    image:"C:\\Users\\Puers\\Documents\\autentica\\6.huarapa-placa-aqua-01-01-01.png"
  }
  ,
  {

    image:"C:\\Users\\Puers\\Documents\\autentica\\7.huarapa-placa-french-negras-01.png",
    url:'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/20476150_1091451790954614_8301183982235433178_n.jpg?oh=ea9c21e320de4e9d8b929a8d19153d42&oe=5A36234B',
    msg:'Huarapa French Negras'
  }
  ,
  {

    url:'https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/20597045_1091451870954606_7579570840139057899_n.jpg?oh=22c72dbc68f2df7eabce9672a9cc9dbc&oe=59F3A91D',
    msg:'Huarapa Tiger',
    image:"C:\\Users\\Puers\\Documents\\autentica\\8.huarapa-placa-tiger-01.png"
  }
];
var loop=0;


module.exports = {
  run : function(){
    sails.log.info("facebot.js: "+new Date());

    var titulo="Llego Autentica ❤! Te traemos las zapas mas copadas! Tenemos stock inmediato, consultanos al privado";
    var precio ="0";
    var groupUrl='https://www.facebook.com/groups/189905047763101/';

   // var uploadTimeout=30000;


    if(posts.length==loop)
    {
      //Vuelvo a arrancar el loop
      loop=0;
    }
    loop++;

    var post = posts[loop];

    FacebookService.postImageSelenium(function(){



    },titulo,precio,post.image,groupUrl);

    /*
    //Compra venta parana
    var grupoId=189905047763101;

    if(posts.length==loop)
    {
      //Vuelvo a arrancar el loop
      loop=0;
    }
    loop++;

    var post = posts[loop];
    post.msg = templateMsg.replace('{model}',post.msg);
    FacebookService.postImage(grupoId,post.url,post.msg,function(res){

      console.log(res);
    });
*/
  }
};
