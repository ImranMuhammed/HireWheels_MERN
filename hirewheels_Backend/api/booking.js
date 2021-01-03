const util=require('../tools/util');
const bookingController=require('../controller/booking')
const userException = require('../tools/userException');
const { userErrors } = require('../constants/errors');
const refStrings = require('../constants/refStrings');

const bookVehicle=async(req,res)=>{

    try{

        let response;
        let vehicleId;
        let pickupDate;
        let pickupLocation;
        let dropOffDate;
        let bookingDate;
      //  let bookingAmount;
        let vehicleNumber;
        let userEmail;
        let NumberOfDaysVehicleBooked;
        let bookedInfo;

        //Get all datas from the body
        vehicleId=req.body.vehicleId;
        pickupDate=req.body.pickupDate
        pickupLocation=req.body.pickupLocation
        dropOffDate=req.body.dropOffDate
        bookingDate=req.body.bookingDate
     //   bookingAmount=req.body.bookingAmount
     //   vehicleNumber=req.body.vehicleNumber
        userEmail=req.body.userEmail

        //Validate Prickup and DropOffDate
        NumberOfDaysVehicleBooked=await util.getNumberOfDaysBooked(pickupDate,dropOffDate);
       if(NumberOfDaysVehicleBooked<0) throw new userException(userErrors.invalidDate);

       //Update the Booking model in DB
       bookedInfo= await bookingController.bookVehicle(vehicleId,pickupDate,pickupLocation,dropOffDate,bookingDate,userEmail,NumberOfDaysVehicleBooked)

       response=await util.customResponse(bookedInfo,200);

       res.status(response.statusCode).send(response)
       
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }

}

const closeBooking=async(req,res)=>{
    try{
        let vehicleId;
        let response;

        vehicleId=req.params.id;

        await bookingController.closeBooking(vehicleId);

        response=await util.customResponse(refStrings.successBookingClosed,200);
        
        res.status(response.statusCode).send(response)

    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
}

module.exports={
    bookVehicle,
    closeBooking
}