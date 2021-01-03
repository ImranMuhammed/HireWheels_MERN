var config={};

/*=========JWT Secret config =============*/
config.jwt={};
config.jwt.secretKey="JWT_SECRET_KEY";
config.jwt.expiryTime=Date.now()+180000;

/*=========JWT Secret config =============*/

/*=========MONGODB config =============*/
config.db={};
config.db.url="mongodb://localhost/Hirewheels"
/*=========MONGODB config =============*/

/*=========SERVER config =============*/
config.server={};
config.server.port=9000
/*=========SERVER config =============*/
module.exports=config;