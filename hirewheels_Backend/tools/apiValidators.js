const validate=require('jsonschema').validate;


const signUp=reqBody=>{
    return validate(reqBody,{
        "additionalProperties":false,
        "type":"object",
        "properties":{
            "firstName":{"type":"String", "required":"true"},
            "lastName":{"type":"String", "required":"true"},
            "email":{"type":"String", "required":"true"},
            "password":{"type":"String", "required":"true"},
            "mobileNo":{"type":"Number", "required":"true"},
        }
    })
}

const login=reqBody=>{
    return validate(reqBody,{
        "additionalProperties":false,
        "type":"Object",
        "properties":{
            "email":{"type":"String" , required:"true"},
            "password":{"type":"String", "required":"true"}
        }
    })
}

const addVehicle=reqBody=>{
    return validate(reqBody,{
        "additionalProperties":false,
        "type":Object,
        "properties":{
            "vehicleModel":{"type":"String", "required":"true"},
            "vehicleCategory":{"type":"String", "required":"true"},
            "vehicleSubCategory":{"type":"String", "required":"true"},
            "vehicleNumber":{"type":"String", "required":"true"},
            "vehicleColor":{"type":"String", "required":"true"},
            "vehicleLocation":{"type":"String", "required":"true"},
            "vehicleImage":{"type":"String", "required":"true"},
            "vehiclePricePerDay":{"type":"Number", "required":"true"},
            "vehicleFuelType":{"type":"String", "required":"true"}
        }
    })
}

const updateVehicle=reqBody=>{
    return validate(reqBody,{
        "additionalProperties":false,
        "type":Object,
        "properties":{
            "vehicleModel":{"type":"String", "required":"true"},
            "vehicleCategory":{"type":"String", "required":"true"},
            "vehicleSubCategory":{"type":"String", "required":"true"},
            "vehicleNumber":{"type":"String", "required":"true"},
            "vehicleColor":{"type":"String", "required":"true"},
            "vehicleLocation":{"type":"String", "required":"true"},
            "vehicleImage":{"type":"String", "required":"true"},
            "vehiclePricePerDay":{"type":"Number", "required":"true"},
            "vehicleFuelType":{"type":"String", "required":"true"},
            "vehicleAvailableStatus":{"type":"Boolean", "required":"true", "default":"true"}
        }
    })
}

module.exports={
    signUp,
    login, 
    addVehicle,
    updateVehicle
}