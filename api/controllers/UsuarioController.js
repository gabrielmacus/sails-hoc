/**
 * Created by Puers on 28/06/2017.
 */

module.exports=
{

  confirmacion:function(req,res)
  {
    UsuarioService.enviarConfirmacion();
  }

}
