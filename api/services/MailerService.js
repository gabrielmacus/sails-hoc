var nodemailer =require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');


module.exports=
{

  enviarEmail:function (asunto,emisor,receptor,template,data,callback) {
    
    var transporter = nodemailer.createTransport(sails.config.email);
    var templateDir = path.join(process.cwd(), 'views/emailTemplates', template);
  //  res.view('emailTemplates/confirmacionUsuario', {layout: 'emailTemplates/layout'})

    var opciones={
      subject: asunto,
     // text: 'Hello, {{username}}, Your password is: {{ password }}',
     // html: '<b>Hello, <strong>{{username}}</strong>, Your password is:\n<b>{{ password }}</b></p>',
      from: emisor,
      to:receptor
    };


    var email = new EmailTemplate(templateDir);

    email.render(data,function(err,result)
    {
      if(err)
      {
        throw err;
      }

      opciones.html=result.html;

      transporter.sendMail(opciones, function(err, info){
        if(err){

          throw err;

        }

        callback(info);
        
      });


    });
    


  }


}
