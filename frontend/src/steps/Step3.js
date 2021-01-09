import React, { useEffect } from 'react'
import {StyledVehicleDetailsContainer,StyledSelectText,StyledVehicleImage,StyledVehicleDetails,StyledVehiclePrice,StyledCategoryButtonContainers} from './Step3Styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRupeeSign} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import {VehicleCategory,CarSubCategory,BikeSubCategory} from '../constants/stepFormConstants'
import {useSelector,useDispatch} from 'react-redux'
import {availableVehiclesList} from '../redux/actions/vehicleActions'
import {addVehicleDetails} from '../redux/actions/BookingActions'

import VEHICLE from './data'
import { useState } from 'react'


export default function Step3(props) {
    const[category,setCategory]=useState(VehicleCategory.CAR);
    const[subCategory,setSubCategory]=useState('ALL')

    const availableVehicles=useSelector(state=>state.availableVehicles);
    const{availableSuccess,vehicles,error}=availableVehicles;

    const bookingData=useSelector(state=>state.bookingData);
    const{pickupDate,dropOffDate,pickupLocation}=bookingData;


    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(availableVehiclesList(category,pickupLocation))
    },[category])


    return (<>
            <StyledCategoryButtonContainers>
                <Button variant="primary" >Back</Button>
                <div>
                    <Button 
                        variant={category==VehicleCategory.CAR?'primary':'outline-primary'} 
                        onClick={()=>setCategory(VehicleCategory.CAR)}>
                        {VehicleCategory.CAR}
                    </Button>
                    <Button 
                        variant={category==VehicleCategory.BIKE?'primary':'outline-primary'} 
                        onClick={()=>setCategory(VehicleCategory.BIKE)}>
                        {VehicleCategory.BIKE}
                    </Button>
                </div>
                <StyledSelectText 
                id="location"
                name="location"
                onChange={(e)=>{setSubCategory(e.target.value)}}
                >   
                {   category===VehicleCategory.CAR ?
                    CarSubCategory.map(subCat=>{
                        return (
                            <option>{subCat}</option>
                        )
                    }):
                    BikeSubCategory.map(subCat=>{
                        return (
                            <option>{subCat}</option>
                        )
                    })
                }    
                </StyledSelectText>
                
            </StyledCategoryButtonContainers>
            {
              (vehicles!==undefined && subCategory=="ALL") ?  vehicles.map(vehicle=>{
                    return( 
                        <StyledVehicleDetailsContainer>
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
                                </StyledVehicleDetails>
                            <StyledVehiclePrice>
                                <div><FontAwesomeIcon icon={faRupeeSign}/>
                                    {vehicle.vehiclePricePerDay}
                                </div>
                                <Button onClick={()=>{
                                    dispatch(addVehicleDetails(vehicle));
                                    props.nextStep(3);
                                }} >
                                 BOOK NOW</Button>
                            </StyledVehiclePrice>
                        </StyledVehicleDetailsContainer>
                    )
                }):

              vehicles!==undefined &&  vehicles.map(vehicle=>{
                    return(  
                        vehicle.vehicleSubCategory===subCategory &&
                        <StyledVehicleDetailsContainer>
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
                                </StyledVehicleDetails>
                            <StyledVehiclePrice>
                                <div><FontAwesomeIcon icon={faRupeeSign}/>
                                    {vehicle.vehiclePricePerDay}
                                </div>
                                <Button  onClick={()=>{
                                    dispatch(addVehicleDetails(vehicle));
                                    props.nextStep(3);
                                }} >
                                 BOOK NOW</Button>
                            </StyledVehiclePrice>
                        </StyledVehicleDetailsContainer>
                    )
                })

            }
       
    </>
    )
}
