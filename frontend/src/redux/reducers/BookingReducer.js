import { ADD_DROPOFF_DATE, ADD_PICKUP_DATE, ADD_VEHICLE_DETAILS, VEHICLE_BOOK_FAIL, VEHICLE_BOOK_REQUEST, VEHICLE_BOOK_SUCCESS } from "../../constants/BookingConstants"

const initialState={
    pickupDate:undefined,
    pickupLocation:undefined,
    dropOffDate:undefined,
    vehicleId:undefined,
    vehicle:undefined
}

const bookingDataReducer=(state=initialState,action)=>{
    const data=action.payload
    switch(action.type){
        case ADD_PICKUP_DATE: return { ...state,"pickupDate":data.pickupDate}
        case ADD_DROPOFF_DATE: return {...state,"pickupLocation":data.pickupLocation,"dropOffDate":data.dropOffDate }
        case ADD_VEHICLE_DETAILS: return {...state , "vehicle":data.vehicle}
        default : return state;
    }
}

const bookedData=(state={},action)=>{
    const data=action.payload
    switch(action.type){
        case VEHICLE_BOOK_REQUEST: return {loading:true}
        case VEHICLE_BOOK_SUCCESS: return {loading:false, bookedData:action.payload, bookinfSuccess:"Vehicle is booked successfully"}
        case VEHICLE_BOOK_FAIL: return {loading:false, error:action.payload}
        default : return state;
    }
}

export {bookingDataReducer,bookedData }