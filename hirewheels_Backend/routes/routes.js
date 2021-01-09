const express=require('express');
const auth=require('../api/auth')
const vehicle=require('../api/vehicle')
const router=express.Router();
const booking=require('../api/booking')
const middleWare=require('../tools/middleWare')

//Auth
router.post('/hirewheels/v1/users',auth.signUp);
router.post('/hirewheels/v1/users/access-token',auth.login)

//Admin Routes
router.post('/hirewheels/v1/vehicles/add', vehicle.addVehicle);
router.get('/hirewheels/v1/vehicles/',vehicle.getVehicles);
router.get('/hirewheels/v1/vehicle/:id',middleWare.isAdminAuthenticated,vehicle.getVehicleById)
router.put('/hirewheels/v1/vehicles/:id',middleWare.isAdminAuthenticated,vehicle.updateVehicleDetails);
router.delete('/hirewheels/v1/vehicles/:id',middleWare.isAdminAuthenticated,vehicle.removeVehicle);
router.put('/hirewheels/v1/bookings/:id',middleWare.isAdminAuthenticated,booking.closeBooking);

//User Routes
router.get('/hirewheels/v1/vehicles/available/',vehicle.availableVehicles);
router.post('/hirewheels/v1/bookings',booking.bookVehicle)


module.exports=router