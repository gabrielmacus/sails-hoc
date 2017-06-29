/**
 * Created by Puers on 28/06/2017.
 */

module.exports=
{

  registrar:function(req,res)
  {


    var usuario=req.allParams();

    usuario.nivel=1;

    Usuario.create(usuario).exec(function (err, records) {

      if(err)
      {
        return res.negotiate(err);

        //   throw err;
      }

      UsuarioService.enviarConfirmacion(req,res,records);

      res.json(records);

    });
    //UsuarioService.enviarConfirmacion(req,res);
  }

}
