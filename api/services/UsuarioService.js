/**
 * Created by Puers on 28/06/2017.
 */
module.exports=
{
  enviarConfirmacion:function(req,res,usuario)
  {
    MailerService.enviarEmail(`Ya casi estas registrado ${usuario.nombre}`,sails.config.email.auth.user,usuario.email,'confirmacion',usuario
    ,function (info) {

        res.json(true);

      });
  }

}
