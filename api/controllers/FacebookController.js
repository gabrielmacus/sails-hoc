/**
 * Created by Puers on 02/08/2017.
 */
module.exports=
{
  postImage: function (req, res) {
    FacebookService.postImage(req.param('target'),req.param('url'),req.param('msg'), function (result) {

      if(res.error)
      {
        return res.json(res.code,res.i18n(res.error));
      }

      return res.json(result);

    });

  },
  getLongToken:function(req,res){

    FacebookService.getLongToken(req.param('short_token'),function(result){

      if(res.error)
      {
        return res.json(res.code,res.i18n(res.error));
      }

      return res.json(result);

    })
  },
  postImageSelenium:function (req,res) {

    var titulo="Llego Autentica ❤! Te traemos las zapas mas copadas! Tenemos stock inmediato, consultanos al privado";
    var precio ="0";
    var groupUrl='https://www.facebook.com/groups/189905047763101/';

    FacebookService.postImageSelenium(function(){

      res.end();

    },titulo,precio,"C:\\Users\\Puers\\Documents\\autentica\\4.huarapa-placa-grace-01-01.png",groupUrl);

  }
}
