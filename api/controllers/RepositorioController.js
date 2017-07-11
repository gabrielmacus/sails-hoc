/**
 * Created by Puers on 01/07/2017.
 */
module.exports=

{
  create:function (req,res) {

    var repositorio = req.allParams();

    repositorio.usuario = req.session.userId;

    Repositorio.create(repositorio,function (err,results) {

      if(err)
      {
        return res.negotiate(err);

        //   throw err;
      }


      res.json(results);

    });

  }
}
