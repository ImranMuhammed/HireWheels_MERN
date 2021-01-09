const util=require('../tools/util')
const apiValidator=require('../tools/apiValidators')
const vehicleController=require('../controller/vehicle')
const userException = require('../tools/userException');
const { userErrors } = require('../constants/errors');
const refStrings=require('../constants/refStrings')

const addVehicle=async(req,res)=>{
    try{
        //References
        let validate;
        let response;
        let vehicleModel;
        let vehicleCategory;
        let vehicleSubCategory;
        let vehicleNumber;
        let vehicleColor;
        let vehicleLocation;
        let vehicleImage;
        let vehiclePricePerDay;
        let vehicleFuelType;
        let vehicleAvailableStatus;
        let newVehicle;

        //Validate all the datas
        validate=apiValidator.addVehicle(req.body);
        if(!validate.valid) throw new userException(userErrors.invalidVehicleData)

        //Get all datas from the request
        vehicleModel=req.body.vehicleModel;
        vehicleCategory=req.body.vehicleCategory;
        vehicleSubCategory=req.body.vehicleSubCategory;
        vehicleNumber=req.body.vehicleNumber;
        vehicleColor=req.body.vehicleColor;
        vehicleLocation=req.body.vehicleLocation;
        vehicleImage=req.body.vehicleImage;
        vehiclePricePerDay=req.body.vehiclePricePerDay;
        vehicleFuelType=req.body.vehicleFuelType;
        vehicleAvailableStatus=true;//req.body.vehicleAvailableStatus;

        //APssing the datas to the addVehicleController
      newVehicle= await vehicleController.addVehicle(vehicleModel,vehicleCategory,vehicleSubCategory,vehicleNumber,vehicleColor,vehicleLocation,vehicleImage,vehiclePricePerDay,vehicleFuelType,vehicleAvailableStatus);

        response=await util.customResponse(newVehicle,200);

        res.status(response.statusCode).send(response.message)        
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
}

const getVehicles=async(req,res)=>{
    try{
        
        let response;
        let allVehiclesList;
        let vehicleSubCategory;

        //Get the Category
     //   vehicleSubCategory=req.query.category;
       // console.log("Vehicle category");
        //console.log(vehicleSubCategory);

        //Get all the vehicles
        allVehiclesList=await vehicleController.getAllVehicles();

        response=await util.customResponse(allVehiclesList,200);

        res.status(response.statusCode).send(response.message)
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
}

const availableVehicles=async(req,res)=>{
    try{
        
        let response;
        let allVehiclesList;
        let vehicleSubCategory;
        let availableVehiclesList;
        let category;
        let pickupDate;
        let pickupLocation;

        category=req.query.category;
        pickupLocation=req.query.location

        //Get all the vehicles
        allVehiclesList=await vehicleController.getAllVehicles();
        
        availableVehiclesList=allVehiclesList.filter(vehicle=>vehicle.vehicleAvailableStatus==true && vehicle.vehicleCategory===category && vehicle.vehicleLocation==pickupLocation)

        response=await util.customResponse(availableVehiclesList,200);

        res.status(response.statusCode).send(response.message)
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
}

const getVehicleById=async(req,res)=>{
    try{
        //References
        let vehicleId;
        let vehicleData;
        let response;

        //Get all datas from the request
        vehicleId=req.params.id;

        //APssing the datas to the addVehicleController
        vehicleData=await vehicleController.getVehicleById(vehicleId);

        response=await util.customResponse(vehicleData,200);

        res.status(response.statusCode).send(response.message)        
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
}

const updateVehicleDetails=async(req,res)=>{
    try{
        //References
        let vehicleId;
        let validate;
        let response;
        let vehicleModel;
        let vehicleCategory;
        let vehicleSubCategory;
        let vehicleNumber;
        let vehicleColor;
        let vehicleLocation;
        let vehicleImage;
        let vehiclePricePerDay;
        let vehicleFuelType;
        let vehicleAvailableStatus;

        //Validate all the datas
        validate=apiValidator.updateVehicle(req.body);
        if(!validate.valid) throw new userException(userErrors.invalidVehicleData)

        //Get all datas from the request
        vehicleId=req.params.id;
        vehicleModel=req.body.vehicleModel;
        vehicleCategory=req.body.vehicleCategory;
        vehicleSubCategory=req.body.vehicleSubCategory;
        vehicleNumber=req.body.vehicleNumber;
        vehicleColor=req.body.vehicleColor;
        vehicleLocation=req.body.vehicleLocation;
        vehicleImage=req.body.vehicleImage;
        vehiclePricePerDay=req.body.vehiclePricePerDay;
        vehicleFuelType=req.body.vehicleFuelType;
        vehicleAvailableStatus=req.body.vehicleAvailableStatus;

        //APssing the datas to the addVehicleController
        await vehicleController.updateVehicleDetails(vehicleId,vehicleModel,vehicleCategory,vehicleSubCategory,vehicleNumber,vehicleColor,vehicleLocation,vehicleImage,vehiclePricePerDay,vehicleFuelType,vehicleAvailableStatus);

        response=await util.customResponse(refStrings.successVehicleUpdated,200);

        res.status(response.statusCode).send(response)        
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
}

const removeVehicle=async(req,res)=>{
    try{
        //References
        let vehicleId;
        let vehicleData;
        let response;

        //Get all datas from the request
        vehicleId=req.params.id;

        //APssing the datas to the addVehicleController
        await vehicleController.removeVehicle(vehicleId);

        response=await util.customResponse(refStrings.successVehicleRemoved,200);

        res.status(response.statusCode).send(response)        
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
}

module.exports={addVehicle,getVehicles,updateVehicleDetails,getVehicleById,removeVehicle,availableVehicles}