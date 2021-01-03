const mongoose=require('mongoose');
const collections=require('../constants/collections')

const vehicleSubCategorySchema=new mongoose.Schema({
   
})

const vehicleSubCategoryModel=mongoose.model(collections.vehicleSubCategory,vehicleSubCategorySchema);

module.exports=vehicleSubCategoryModel;