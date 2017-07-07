/**
 * Created by Gabriel on 07/07/2017.
 */
var fs = require('fs');

module.exports=
{
  index:function (req,res)
  {
    var view= req.param("view");
    var dir = process.cwd()+'/views/panel/app.html';

    if(fs.existsSync(dir))
    {
      res.sendfile(dir);
    }
    else
    {
      res.notFound();
    }


    //  res.view('panel/app', {layout: 'panel/layouts/layout',bodyClasses:["panel"]})
  },
  loadView:function (req,res) {
   var view= req.param("view");
    var dir = process.cwd()+'/views/panel/views/'+view;


    if(fs.existsSync(dir))
    {
      res.sendfile(dir);
    }
    else
    {
      res.notFound();
    }


  }
}
