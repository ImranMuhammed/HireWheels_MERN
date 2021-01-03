const VehicleModel=require('../models/vehicle');
const userException = require('../tools/userException');
const { userErrors } = require('../constants/errors');
const { response } = require('express');
const category=require('../constants/category')

const addVehicle=async(vehicleModel,vehicleCategory,vehicleSubCategory,vehicleNumber,vehicleColor,vehicleLocation,vehicleImage,vehiclePricePerDay,vehicleFuelType,vehicleAvailableStatus)=>{
    
    try{
        let vehicleDoc={}
        let newVehicle;
        let vehicelAlreadyExist

        //Check if the vehicle with number already exist
        vehicelAlreadyExist= await VehicleModel.findOne({vehicleNumber});
        if(vehicelAlreadyExist!=null) throw new userException(userErrors.vehicleNumberAlreadyExist);


        //Get all the datas to add new vehicle
        vehicleDoc={
            vehicleModel:vehicleModel,
            vehicleCategory:vehicleCategory,
            vehicleSubCategory:vehicleSubCategory,
            vehicleNumber:vehicleNumber,
            vehicleColor:vehicleColor,
            vehicleLocation:vehicleLocation,
            vehicleImage:vehicleImage,
            vehiclePricePerDay:vehiclePricePerDay,
            vehicleFuelType:vehicleFuelType,
            vehicleAvailableStatus:vehicleAvailableStatus
        }

        //Add new Vehicle 
        newVehicle=await VehicleModel.create([vehicleDoc]);

        return true;
    }
    catch(error){
        throw error;
    }
    
}

const getAllVehicles=async(vehicleSubCategory)=>{
    try{

        let availableVehicles;

        //Get all the available vehicles
        switch(vehicleSubCategory.toUpperCase()){
            case category.carSubCategory.SUV :  availableVehicles=await VehicleModel.find({vehicleSubCategory:category.carSubCategory.SUV});
                                                break;
            case category.carSubCategory.SEDAN: availableVehicles=await VehicleModel.find({vehicleSubCategory:category.carSubCategory.SEDAN});
                                                break;
            case category.carSubCategory.HATCHBACK: availableVehicles=await VehicleModel.find({vehicleSubCategory:category.carSubCategory.HATCHBACK});
                                                break;
                                        default   : availableVehicles=await VehicleModel.find({});
                                                break;
        }
        

        if(availableVehicles==null || availableVehicles.length==0) throw new userException(userErrors.vehiclesNotAvailable);

        return availableVehicles;
    }
    catch(error){
        throw error;
    }
}

const getVehicleById=async(vehicleId)=>{
    try{
        let vehicleData
        let _id=vehicleId;

        //Check if the vehicle with number already exist
        vehicleData= await VehicleModel.findOne({_id});
        if(vehicleData==null) throw new userException(userErrors.invalidVehicleId);

        return vehicleData;
    }
    catch(error){
        throw error;
    }
}

const updateVehicleDetails=async(vehicleId,vehicleModel,vehicleCategory,vehicleSubCategory,vehicleNumber,vehicleColor,vehicleLocation,vehicleImage,vehiclePricePerDay,vehicleFuelType,vehicleAvailableStatus)=>{
     
    try{
        let updatedVehicle;
        let vehicleData
        let _id=vehicleId;

        //Check if the vehicle with number already exist
        vehicleData= await VehicleModel.findOne({_id});
        if(vehicleData==null) throw new userException(userErrors.invalidVehicleId);


        //Update vehicle details
            vehicleData.vehicleModel=vehicleModel;
            vehicleData.vehicleCategory=vehicleCategory;
            vehicleData.vehicleSubCategory=vehicleSubCategory;
            vehicleData.vehicleNumber=vehicleNumber;
            vehicleData.vehicleColor=vehicleColor;
            vehicleData.vehicleLocation=vehicleLocation;
            vehicleData.vehicleImage=vehicleImage;
            vehicleData.vehiclePricePerDay=vehiclePricePerDay;
            vehicleData.vehicleFuelType=vehicleFuelType;
            vehicleData.vehicleAvailableStatus=vehicleAvailableStatus;

        //UpdateVehicle 
        updatedVehicle=await vehicleData.save();

        return true;
    }
    catch(error){
        throw error;
    }
}

const removeVehicle=async(vehicleId)=>{
    try{
        let vehicleData
        let _id=vehicleId;

        //Check if the vehicle with number already exist
        vehicleData= await VehicleModel.findOne({_id});
        if(vehicleData==null) throw new userException(userErrors.invalidVehicleId);

        if(!vehicleData.vehicleAvailableStatus) throw new userException(userErrors.unableToRemove)

        await vehicleData.delete();

        return true;
    }
    catch(error){
        throw error;
    }
}


module.exports={
    addVehicle,
    getAllVehicles, 
    updateVehicleDetails,
    getVehicleById,
    removeVehicle
}