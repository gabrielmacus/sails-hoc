/**
 * Created by Puers on 02/08/2017.
 */
var FB = require('fb');
var  fb = new FB.Facebook({
  version:sails.config.facebook.version,
  appId: sails.config.facebook.id, appSecret: sails.config.facebook.secret
});
FB.setAccessToken(sails.config.facebook.token);

module.exports=
{

  postImage: function (target,url,msg,callback) {

    if(!target)
    {
      target='me';

    }

    var endpoint=target+'/photos';

    FB.api(endpoint, 'post', {
      "url":url,
      "message":msg
    }, function (res) {
      console.log(res);
      if(!res || res.error) {
       return callback({code:500,error:"facebook.postError"});
      }
     return callback({id:res.id});
    });

  },
  getLongToken: function (shortToken,callback) {

    //
    var endpoint="/oauth/access_token?grant_type=fb_exchange_token&client_id="+sails.config.facebook.id+"&client_secret="+sails.config.facebook.secret+"&fb_exchange_token="+shortToken;

  console.log(endpoint);
    if(shortToken)
    {

      FB.api(endpoint, function (res) {
        console.log(res);
        if(!res || res.error) {
          return callback({code:500,error:"facebook.longTokenError"});
        }
        return callback(res);
      });
    }
    else
    {
      callback({error:"facebook.longTokenError",code:400});
    }

  }

}
