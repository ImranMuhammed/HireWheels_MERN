import Axios from 'axios'
import { VEHICLE_ADD_FAIL, VEHICLE_ADD_REQUEST, VEHICLE_ADD_SUCCESS, VEHICLE_AVAILABLE_FAIL, VEHICLE_AVAILABLE_REQUEST, VEHICLE_AVAILABLE_SUCCESS, VEHICLE_LIST_FAIL, VEHICLE_LIST_REQUEST, VEHICLE_LIST_SUCCESS } from '../../constants/VehicleConstants';

const getAllVehicles=()=>async(dispatch)=>{
    try{
        dispatch({type:VEHICLE_LIST_REQUEST});
        const {data} =await Axios.get("/hirewheels/v1/vehicles/");
        dispatch({type:VEHICLE_LIST_SUCCESS , payload:data});
    }
    catch(error){
        dispatch({type:VEHICLE_LIST_FAIL, payload:error})
    }
}

const addVehicle=(vehicleModel,vehicleCategory,vehicleSubCategory,vehicleNumber,vehicleColor,vehicleLocation,vehicleImage,vehiclePricePerDay,vehicleFuelType)=>async(dispatch)=>{
    try{
        dispatch({type:VEHICLE_ADD_REQUEST});
        const {data} =await Axios.post('/hirewheels/v1/vehicles/add',{vehicleModel,vehicleCategory,vehicleSubCategory,vehicleNumber,vehicleColor,vehicleLocation,vehicleImage,vehiclePricePerDay,vehicleFuelType});
        console.log("Inside vehicle Add")
        console.log(data)
        dispatch({type:VEHICLE_ADD_SUCCESS , payload:data});
    }
    catch(error){
        dispatch({type:VEHICLE_ADD_FAIL, payload:error})
    }
}

const availableVehiclesList=(category,location)=>async(dispatch)=>{
    try{
        dispatch({type:VEHICLE_AVAILABLE_REQUEST});
        const {data} =await Axios.get(`/hirewheels/v1/vehicles/available/?category=${category}&&location=${location}`);
        console.log("Inside vehicle Available")
        console.log(data)
        dispatch({type:VEHICLE_AVAILABLE_SUCCESS , payload:data});
    }
    catch(error){
        dispatch({type:VEHICLE_AVAILABLE_FAIL, payload:error})
    }
}

export {getAllVehicles,addVehicle,availableVehiclesList}