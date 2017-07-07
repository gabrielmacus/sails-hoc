/**
 * Created by Gabriel on 07/07/2017.
 */

module.exports=
{
  index:function (req,res)
  {
    res.view('panel/app', {layout: 'panel/layouts/layout',bodyClasses:["panel"]})
  },
  loadView:function (req,res) {
   var view= req.param("view");
    var dir = process.cwd()+'/views/panel/views/'+view;
    console.log(dir);

    res.sendfile(dir);


  }
}
