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

    require('../../crontab/facebot').run();
  }
}
