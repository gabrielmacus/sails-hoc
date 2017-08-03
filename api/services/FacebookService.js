/**
 * Created by Puers on 02/08/2017.
 */

var webdriverio = require('webdriverio');
var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};
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

  },
  postImageSelenium: function(callback)
  {

     webdriverio
      .remote(options)
      .init()
       .url('https://facebook.com')
    .setValue('#email','rocio.dure.92')
    .setValue('#pass','pitufino')
    .click("[data-testid='royal_login_button']")
    .url('https://www.facebook.com/groups/189905047763101/')
    .click("[placeholder*='vendes']")
    .setValue("[placeholder*='vendes']","test") //titulo
    .click("[placeholder*='vendes']")
    .click("[placeholder*='vendes']")
    .waitForExist('[placeholder*="precio"]')
    .setValue("[placeholder*='precio']","0")
    .chooseFile("[title*='subir']","C:\\Users\\Gabriel\\Downloads\\KApI135.jpg")
      .click("[contenteditable]")
    .execute(function () {
      var el=document.createElement("<span data-text='true'>Messsage</span>");
      document.querySelector('[data-text="true"]').replaceWith(el);
    });

    return callback({});
    /*
    webdriverio
      .remote(options)
      .init()
      .url('https://facebook.com')
      .setValue('#email','rocio.dure.92')
      .setValue('#pass','pitufino')
      .click("[data-testid='royal_login_button']")
      .url('https://www.facebook.com/groups/189905047763101/')
      .click("._58al")
      .setValue("[placeholder*='vendes']","test") //titulo
      .click("._58al")
     // .waitForExist("[placeholder*='precio']")
      .waitUntil
      .setValue("[placeholder*='precio']","0")
      .chooseFile("[title*='subir']","C:\\Users\\Gabriel\\Downloads\\KApI135.jpg")

      .keys("[contenteditable]",'Keys Strokes')*/

      /*.url('http://www.google.com')
      .getTitle().then(function(title) {
        console.log('Title was: ' + title);
      })*/
     // .end();
  }

}
