const mongoose=require('mongoose');
const collections=require('../constants/collections')

const vehicleSchema=new mongoose.Schema({
    vehicleModel:{type:String, required:true},
    vehicleCategory:{type:String, required:true},
    vehicleSubCategory:{type:String, required:true},
    vehicleNumber:{type:String, required:true},
    vehicleColor:{type:String, required:true},
    vehicleLocation:{type:String, required:true},
    vehicleImage:{type:String, required:true},
    vehiclePricePerDay:{type:Number, required:true},
    vehicleFuelType:{type:String, required:true},
    vehicleAvailableStatus:{type:Boolean, required:true, default:true}
})
const vehicleModel=mongoose.model(collections.vehicle,vehicleSchema);

module.exports=vehicleModel;