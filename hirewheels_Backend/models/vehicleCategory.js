const mongoose=require('mongoose');
const collections=require('../constants/collections')

const vehicleCategorySchema=new mongoose.Schema({
   vehicleType:{type:String ,required:true}
})

const vehicleCategoryModel=mongoose.model(collections.vehicleCategory,vehicleCategorySchema);

module.exports=vehicleCategoryModel;