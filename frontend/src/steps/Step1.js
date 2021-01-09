import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import {StyledText,StyledInputText,StyledStepContainer} from  './Step1Styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import {addPickupDate} from '../redux/actions/BookingActions'
import {useDispatch, useSelector} from 'react-redux'

export default function Step1() {

    const bookingData=useSelector(state=>state.bookingData);
    const{pickupDate}=bookingData;
    

    const dispatch=useDispatch();

  /*   const handlePickupDate=(e)=>{
        e.preventDefault();
        data.pickupDate=e.target.value;
        
    }
 */
    return (
        <StyledStepContainer>
            <StyledText>Select a Pickup Date</StyledText>
            <StyledInputText 
            id="pickupDate"
            name="pickupDate"
            type="date"
            value={pickupDate}
            onChange={(e)=>{dispatch(addPickupDate(e.target.value))}}>
            </StyledInputText>
        </StyledStepContainer>
        
    )
}
