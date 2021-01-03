const config=require('../config/config');
const mongoose=require('mongoose');

const dbURL=config.db.url;


const connectDB=()=>{
    console.log("Connecting to Mongo URL:==>"+dbURL);
  return  mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true})
        .then(()=>{
        console.log("Mongodb is connected");
        return new Promise((resolve,reject)=>{resolve("Mongo Connected")})
    })
.catch(()=>{
    console.log("Some error occured while connecting to  mongodb");
    return new Promise((resolve,reject)=>{reject("Some error occured while connecting to  mongodb")})})
}

module.exports={connectDB};