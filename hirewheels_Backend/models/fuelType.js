const mongoose=require('mongoose');
const collections=require('../constants/collections');

const fuelTypeSchema=new mongoose.Schema({
    
})

const fuelTypeModel=mongoose.model(collections.fuelType,fuelTypeSchema);

module.exports=fuelTypeModel;