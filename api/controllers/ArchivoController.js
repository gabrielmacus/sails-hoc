/**
 * Created by Puers on 02/07/2017.
 */
const path=require('path');
const dateFormat = require('dateformat');

module.exports=
{
  subir:function (req, res) {

    var now=new Date();

    var dirname=dateFormat(now, "yyyy/mm/dd");

     dirname= path.resolve(sails.config.appPath,`media/${dirname}`);




}
}
