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
  postImageSelenium: function(callback,titulo,precio,images,groupUrl)
  {

   var browser=  webdriverio
    .remote(options)
    .init()
    .url('https://facebook.com')
    .setValue('#email','rocio.dure.92')
    .setValue('#pass','pitufino')
    .click("[data-testid='royal_login_button']")
    .url(groupUrl)
    .click("[placeholder*='vendes']")
    .setValue("[placeholder*='vendes']",titulo) //titulo
    .click("[placeholder*='vendes']")
    .click("[placeholder*='vendes']")
    .waitForExist('[placeholder*="precio"]')
    .setValue("[placeholder*='precio']",precio);

    if(images.length)
    {
      for(k in images)
      {

        browser.chooseFile("[title*='subir']",images[k])
      }
    }

    browser.click("[contenteditable]")
    .execute(function () {

          setTimeout(
            function () {

              document.querySelector("[type='submit'][aria-haspopup='true']").click();

            },180000
          );
         //document.querySelector(".notranslate._5rpu").innerHTML="asdad";
/*
         document.querySelector("._1p1t").remove();
         document.querySelector("[contenteditable]").removeAttribute("aria-describedby");
         var el=document.createElement("span");
         el.dataset.text="true";
         el.innerHTML="Message";
         console.log(el);
         document.querySelector('._5rpu > [data-text="true"]').replaceWith(el);*/
    });
  //  .end();
  /*  .waitForEnabled("[type='submit'][aria-haspopup='true']")
    .click('[type="submit"][aria-haspopup="true"]');
*/

/*
    webdriverio
      .remote(options)
      .init()
      .url('https://facebook.com')
      .setValue('#email','rocio.dure.92')
      .setValue('#pass','pitufino')
      .click("[data-testid='royal_login_button']")
      .url('https://www.facebook.com/permalink.php?story_fbid=1091452244287902&id=1032665866833207')
      .click("[title*='a amigos o']")
      .click(".share_action_link")
      .waitForExist("._54nf > .__MenuItem > a")
      .click("._54nf > .__MenuItem > a")
      .waitForExist("#audience_group")
      .setValue("#audience_group","C")
*/
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
      .waitForExist("[placeholder*='precio']")
      .setValue("[placeholder*='precio']","0")
      .chooseFile("[title*='subir']","C:\\Users\\Puers\\Documents\\autentica\\2.huarapa-placa-pink-01.png")
     // .keys("[contenteditable]",'Keys Strokes')
*/
    return callback({});

      /*.url('http://www.google.com')
      .getTitle().then(function(title) {
        console.log('Title was: ' + title);
      })*/
     // .end();
  }

}
