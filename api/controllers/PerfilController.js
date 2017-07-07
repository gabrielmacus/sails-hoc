/**
 * Created by Gabriel on 07/07/2017.
 */
module.exports=
{
  index:function (req,res) {

    res.view('site/usuario/perfil', {layout: 'site/layouts/layout',bodyClasses:["perfil"]});
  }
}
