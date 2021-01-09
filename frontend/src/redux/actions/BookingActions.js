import { ADD_DROPOFF_DATE, ADD_PICKUP_DATE, ADD_VEHICLE_DETAILS, VEHICLE_BOOK_FAIL, VEHICLE_BOOK_REQUEST, VEHICLE_BOOK_SUCCESS } from "../../constants/BookingConstants"
import Axios from 'axios'

const addPickupDate=(pickupDate)=>(dispatch)=>{
    dispatch({
        type:ADD_PICKUP_DATE,
        payload:{"pickupDate":pickupDate}
    })
}

const addDropOffDate=(dropOffDate,pickupLocation)=>(dispatch)=>{
    dispatch({
        type:ADD_DROPOFF_DATE,
        payload:{"dropOffDate":dropOffDate, "pickupLocation":pickupLocation }
    })
}

const addVehicleDetails=(vehicle)=>(dispatch)=>{
    dispatch({
        type:ADD_VEHICLE_DETAILS,
        payload:{"vehicle":vehicle }
    })
}

const bookVehicle=(vehicleId,pickupDate,dropOffDate,pickupLocation,bookingDate,userEmail)=>async(dispatch)=>{
    try{
        dispatch({type:VEHICLE_BOOK_REQUEST});
        const {data} =await Axios.post('/hirewheels/v1/bookings', {vehicleId,pickupDate,dropOffDate,pickupLocation,bookingDate,userEmail});
        console.log("Inside Booking Available")
        console.log(data)
        dispatch({type:VEHICLE_BOOK_SUCCESS , payload:data});
    }
    catch(error){
        dispatch({type:VEHICLE_BOOK_FAIL, payload:error})
    }
}






export {
    addPickupDate,
    addDropOffDate,
    addVehicleDetails,
    bookVehicle
}