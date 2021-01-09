import React,{useState} from 'react'
import {StyledVehicleDetailsContainer,StyledSelectText,StyledVehicleImage,StyledVehicleDetails,StyledVehiclePrice,StyledCategoryButtonContainers} from './Step3Styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRupeeSign} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import {VehicleCategory,CarSubCategory,BikeSubCategory} from '../constants/stepFormConstants'
import {useSelector,useDispatch} from 'react-redux'
import {bookVehicle} from '../redux/actions/BookingActions'



export default function Step4() {

    const bookingData=useSelector(state=>state.bookingData);
    const{pickupDate,dropOffDate,pickupLocation,vehicle}=bookingData;

    const userLogin=useSelector(state=>state.userLogin);
    const{userInfo}=userLogin

    const bookedVehicle=useSelector(state=>state.bookedVehicle);
    const{bookinfSuccess,error:bookingError}=bookedVehicle

    const[isConfirmed,setIsConfirmed]=useState(false)

    const dispatch=useDispatch()

    const numberOfDays=(pickupDate,dropOffDate)=>{
        const numberOfDaysInSec=new Date(dropOffDate) - new Date(pickupDate)
        const numberOfDays=numberOfDaysInSec/(60*60*24*1000)
        return numberOfDays;
    }

    return (
        <>      {(bookinfSuccess && isConfirmed) && <h3 className="btn-success">Vehicle has been booked successfully</h3>}
                {(bookingError && isConfirmed) && <h3 className="btn-danger">Some error occured while booking Vehicle</h3>}
                {   vehicle!==undefined &&     <StyledVehicleDetailsContainer>
                                <StyledVehicleImage src={vehicle.vehicleImage}></StyledVehicleImage>
                                <StyledVehicleDetails>
                                    <div style={{fontWeight:"bold", fontSize:25+"px"}}>
                                        {vehicle.vehicleModel}
                                    </div>
                                    <div><span style={{fontWeight:"bold"}}>Color:</span>
                                        {vehicle.vehicleColor}
                                    </div>
                                    <div><span style={{fontWeight:"bold"}}>Fuel Type:</span> 
                                        {vehicle.vehicleFuelType}
                                    </div>
                                    <div><span style={{fontWeight:"bold"}}>Sub Category:</span> 
                                        {vehicle.vehicleSubCategory}
                                    </div>
                                    <div><span style={{fontWeight:"bold"}}>Pickup Date:</span> 
                                        {pickupDate}
                                    </div>
                                    <div><span style={{fontWeight:"bold"}}>DropOff Date:</span> 
                                        {dropOffDate}
                                    </div>
                                    <div><span style={{fontWeight:"bold"}}>Price per day:</span> 
                                        <FontAwesomeIcon icon={faRupeeSign}/>
                                            {vehicle.vehiclePricePerDay}
                                    </div>
                                    <div><span style={{fontWeight:"bold"}}>Number of Days:</span> 
                                            {numberOfDays(pickupDate,dropOffDate)}
                                    </div>
                                    <div style={{fontWeight:"bold", fontSize:30+"px"}}><span style={{fontWeight:"bold", fontSize:30+"px"}}>Total Amount:</span> 
                                            {numberOfDays(pickupDate,dropOffDate)*vehicle.vehiclePricePerDay}
                                    </div>
                                </StyledVehicleDetails>
                                <div>
                                    
                                </div>
                        </StyledVehicleDetailsContainer>
                }
                <div>
                    { !isConfirmed &&
                    <Button style={{marginRight:1+"rem" ,  width:150+"px"}} variant="primary" onClick={()=>{
                                                                                        dispatch(bookVehicle(vehicle._id,pickupDate,dropOffDate,pickupLocation,'2021-01-06',userInfo.email))
                                                                                        setIsConfirmed(true)
                                                                                        }} >Confirm Booking</Button>
                    }
                </div>
       
    </>
    )
}
