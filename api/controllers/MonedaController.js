/**
 * Created by Puers on 29/06/2017.
 */
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
  },
  confirmar:function(req,res){
    var hash= req.param("hash");

    Usuario.update({codigoConfirmacion:hash,estado:1},{estado:2},function(err,result)
    {
      if(err)
      {
        return res.negotiate(err);

      }

      var template="";

      if(result.length === 0)
      {
        template="yaFueConfirmado";
      }
      else
      {
        template="exito";
      }

      res.view(`confirmacionEmail/${template}`,{"usuario":result[0],"layout":'layouts/layout'});
    });
  }
}

module.exports=
{

}
