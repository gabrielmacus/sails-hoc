/**
 * Created by Gabriel on 30/06/2017.
 */
module.exports=
{
  index:function (req,res) {
    res.view('home/index', {layout: 'layouts/layout'});
  }
}
