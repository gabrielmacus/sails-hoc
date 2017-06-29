/**
 * Created by Puers on 28/06/2017.
 */
module.exports=
{
  enviarConfirmacion:function(req,res)
  {
    sails.hooks.email.send(
     /* "testEmail",*/"test",
      {
        recipientName: "Joe",
        senderName: "Sue"
      },
      {
        to: "gabrielmacus@gmail.com",
        subject: "Hi there"
      },
      function(err) {console.log(err || "It worked!");}
    )
  }

}
