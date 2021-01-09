import{ VEHICLE_ADD_FAIL, VEHICLE_ADD_REQUEST, VEHICLE_ADD_SUCCESS, VEHICLE_AVAILABLE_FAIL, VEHICLE_AVAILABLE_REQUEST, VEHICLE_AVAILABLE_SUCCESS, VEHICLE_LIST_FAIL, VEHICLE_LIST_REQUEST, VEHICLE_LIST_SUCCESS } from "../../constants/VehicleConstants";


const allVehiclesReducer=(state={vehicles:[]},action)=>{
    switch(action.type){
        case VEHICLE_LIST_REQUEST : return {loading:true}
        case VEHICLE_LIST_SUCCESS : return {
                                        loading:false,
                                        vehicles:action.payload
                                     }
        case VEHICLE_LIST_FAIL   : return {
                                        loading:false,
                                        error:action.payload
                                    }
             default :     return state;
    }
}

const addVehicleReducer=(state={vehicles:[]},action)=>{
    switch(action.type){
        case VEHICLE_ADD_REQUEST : return {addSuccess:false}
        case VEHICLE_ADD_SUCCESS : return {
                                        addSuccess:true,
                                        vehicles:action.payload
                                     }
        case VEHICLE_ADD_FAIL   : return {
                                         addSuccess:true,
                                        error:action.payload
                                    }
             default :     return state;
    }
}

const availableVehicleReducer=(state={vehicles:[]},action)=>{
    switch(action.type){
        case VEHICLE_AVAILABLE_REQUEST : return {availableSuccess:false}
        case VEHICLE_AVAILABLE_SUCCESS : return {
                                        availableSuccess:true,
                                        vehicles:action.payload
                                     }
        case VEHICLE_AVAILABLE_FAIL   : return {
                                         availableSuccess:true,
                                        error:action.payload
                                    }
             default :     return state;
    }
}

export {allVehiclesReducer,addVehicleReducer,availableVehicleReducer}