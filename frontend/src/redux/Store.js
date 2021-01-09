import { combineReducers, compose, createStore, applyMiddleware} from 'redux'
import {userLoginReducer} from './reducers/UserReducer'
import {bookingDataReducer,bookedData} from './reducers/BookingReducer'
import {allVehiclesReducer,addVehicleReducer,availableVehicleReducer} from './reducers/VehiclesReducers'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'



const userInfo=Cookie.getJSON("userInfo")||undefined;

const initialState={userLogin:{userInfo}};

const reducer=combineReducers({
    userLogin:userLoginReducer,
    bookingData:bookingDataReducer,
    vehiclesList:allVehiclesReducer,
    addVehicle:addVehicleReducer,
    availableVehicles:availableVehicleReducer,
    bookedVehicle:bookedData
    
})

const store=createStore(reducer,initialState,compose(applyMiddleware(thunk)));

export default store;