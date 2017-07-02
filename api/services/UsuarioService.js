/**
 * Created by Puers on 28/06/2017.
 */

const crypto = require('crypto');

module.exports=
{
  enviarConfirmacion:function(req,res,usuario)
  {
    var asunto=res.__("confirmacionEmail.asunto",usuario.nombre);

    var hash=crypto.createHash(sails.config.hashAlgo);
    hash.update(usuario.id);

    var linkConfirmacion =`${sails.config.siteUrl}/confirmar/usuario/${hash.digest('hex')}`;

    var data={link:linkConfirmacion,texto:res.__('confirmacionEmail.texto'),boton:res.__('confirmacionEmail.boton')};

    MailerService.enviarEmail(asunto,sails.config.email.auth.user,usuario.email,'confirmacion',data
    ,function (err,info) {


        if (err) {
          return res.negotiate(err);
        }

        res.json(true);

      });
  }

}
