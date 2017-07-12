/**
 * Created by Puers on 01/07/2017.
 */
module.exports=

{
  create:function (req,res) {

    var repositorio = req.allParams();

    repositorio.usuario = req.session.userId;

    function callback (err,results)
    {

        if(err)
        {
          return res.negotiate(err);

          //   throw err;
        }

      console.log(results);

        res.json(results);


    }

    if(req.param("id"))
    {
      Repositorio.update({id:req.param("id")},repositorio,callback);
    }
    else
    {
      Repositorio.create(repositorio,callback);
    }


  }
}
