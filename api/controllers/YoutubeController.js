/**
 * Created by Puers on 03/07/2017.
 */
var https = require('https'),
  fs = require('fs');
module.exports=
{
  search: function (req,res) {
    YoutubeService.search(req.param("q"),req.param("p"),function (result) {

      res.json(result);

    });
  }
  ,
  getLink: function (req,res) {

    var id=req.param("video");

    YoutubeService.getLink(id, function (link) {


      if(link.error)
      {
     return   res.json(link.code,res.i18n(link.error));
      }

     return res.json(link.url);

    });

  },
  download: function (req, res) {

    var id=req.param("video");

    YoutubeService.getLink(id, function (link) {

      if(link.error)
      {
        return   res.json(link.code,res.i18n(link.error));
      }
      return  res. json(link);



    });

  }



}
