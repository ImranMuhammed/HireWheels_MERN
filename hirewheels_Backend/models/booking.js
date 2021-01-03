const mongoose=require('mongoose')
const collections=require('../constants/collections')

const bookingSchema=new mongoose.Schema({
    pickupDate:{type:Date , default:Date.now , required:true},
    pickupLocation:{type:String, required:true},
    dropOffDate:{type:Date , default:Date.now , required:true},
    bookingDate:{type:Date , default:Date.now , required:true},
    numberOfDays:{type:Number, default:0, required:true},
    bookingAmount:{type:Number, required:true},
    vehicleNumber:{type:String, required:true},
    userEmail:{type:String,required:true},
})

const bookingModel=mongoose.model(collections.booking,bookingSchema);

module.exports=bookingModel;