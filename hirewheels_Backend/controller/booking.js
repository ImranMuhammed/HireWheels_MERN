const BookingModel=require('../models/booking')
const userException = require('../tools/userException');
const { userErrors } = require('../constants/errors');
const util=require('../tools/util');
const VehicleModel = require('../models/vehicle');
const UserModel=require('../models/user')


const bookVehicle=async(vehicleId,pickupDate,pickupLocation,dropOffDate,bookingDate,userEmail,NumberOfDaysVehicleBooked)=>{
    try{
            let bookingAmount;
            let vehicle;
            let bookingDoc;
            let newBookedData;
            let vehicleNumber;
            let user;

            //Get the vehicle details
             vehicle=await VehicleModel.findOne({_id:vehicleId});

            if(vehicle==null) throw new userException(userErrors.invalidVehicleId);

            if(!vehicle.vehicleAvailableStatus) throw new userException(userErrors.unavailableForBooking);

            //calculate total booking amount
            bookingAmount=NumberOfDaysVehicleBooked*vehicle.vehiclePricePerDay;

            //Deduct the bookingAmount from User Wallet and update
            user=await UserModel.findOne({email:userEmail});
            if(user==null) throw new userException(userErrors.userNotRegistered);

            if(user.walletMoney < bookingAmount) throw new userException(userErrors.insufficientBalance);

            user.walletMoney=user.walletMoney-bookingAmount;

            user.save();

            //Create bookingDocument to update DB
            vehicleNumber=vehicle.vehicleNumber;

            bookingDoc={
                pickupDate:pickupDate,
                pickupLocation:pickupLocation,
                dropOffDate:dropOffDate,
                bookingDate:bookingDate,
                numberOfDays:NumberOfDaysVehicleBooked,
                bookingAmount:bookingAmount,
                vehicleNumber:vehicleNumber,
                userEmail:userEmail
            }
            
            //Create new Booking
            newBookedData=await BookingModel.create([bookingDoc]);

          
            //Update VehicleAvailable status to false and save
            vehicle.vehicleAvailableStatus=false;
            await vehicle.save();

            //Vehicle Booked Info
            const{vehicleImage,vehicleModel,vehicleColor,vehicleFuelType,vehicleSubCategory,vehiclePricePerDay}=vehicle;
           return {vehicleImage,vehicleModel,vehicleColor,vehicleFuelType,vehicleSubCategory,vehiclePricePerDay,pickupDate,dropOffDate,NumberOfDaysVehicleBooked,bookingAmount};        
    }
    catch(error){
        throw error
    }
}

const closeBooking=async(vehicleId)=>{
    try{

        let vehicle=await VehicleModel.findOne({_id:vehicleId});

        if(vehicle==null) throw new userException(userErrors.invalidVehicleId);

        if(vehicle.vehicleAvailableStatus) throw new userException(userErrors.vehicleIsnotBooked)

        vehicle.vehicleAvailableStatus=true;

        vehicle.save();

        return true;
    }
    catch(error){
        throw error
    }
}

module.exports={
    bookVehicle,
    closeBooking
}