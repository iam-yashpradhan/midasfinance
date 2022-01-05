const path=require('path');

const options = {
    client: "mysql",
    connection: {
      host : "localhost",
      user : "clvrwbaj_midas",
      password : "Midas@1234",
      database : "clvrwbaj_midas",
    },
    uploads: path.join(__dirname)+'/assets/uploads'
  };

module.exports=options;
  