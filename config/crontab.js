/**
 * Created by Puers on 03/08/2017.
 */

module.exports.crontab = {

  /*
   * The asterisks in the key are equivalent to the
   * schedule setting in crontab, i.e.
   * minute hour day month day-of-week year
   * so in the example below it will run every minute
   */


  //Cada 1 hora
//  '0 */1 * * *': function(){
  //   require('../crontab/facebot').run();
  //}



  //'*/45 * * * *':function()
  //{
    //require('../crontab/facebot2').run();
  //}//,
    //'*/40 * * * *':function()
  //{
   // require('../crontab/facebot').run();
  //}

  //Cada media hora, en distintos grupos
  '*/17 * * * *':function()
  {
   require('../crontab/facebot').run();
  }
};
