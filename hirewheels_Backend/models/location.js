const mongoose=require('mongoose');
const collections=require('../constants/collections')

const locationSchema=new mongoose.Schema({
    locationName:{type:String, required:true},
    completeAddress:{type:String, required:true},
    cityName:{type:String, required:true},
    pinCode:{type:Number, required:true}
})

const locationModel=mongoose.model(collections.location,locationSchema);

module.exports=locationModel;