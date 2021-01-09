import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {StyledSelectText,StyledInputContainers,StyledText,StyledStepContainer,StyledInputText} from './Step2Styles'
import {addDropOffDate} from '../redux/actions/BookingActions'

export default function Step2() {
/*     const[data,setData]=useState({
                                dropOffDate :"",
                                 pickupLocation:""
                                }) */

    const bookingData=useSelector(state=>state.bookingData);
    const{pickupDate,dropOffDate,pickupLocation}=bookingData;
    const dispatch=useDispatch()

    /* const handleChange=(e)=>{
        e.preventDefault();
        const id=e.target.id;
        const value=e.target.value
        switch(id){
            case "location": data.pickupLocation=value;
                            break;
            case "dropOffDate": data.dropOffDate=value;
                            break;
                default :return "" 
        }
        if(data.pickupLocation!=="" &&data.dropOffDate){
            dispatch(addDropOffDate(data.dropOffDate,data.pickupLocation))
        }   
    } */

    return (
        <StyledStepContainer>
            <StyledText>Pickup Date: {pickupDate} </StyledText>
            <StyledInputContainers>
                <StyledSelectText 
                id="location"
                name="location"
                value={pickupLocation}
                onChange={(e)=>dispatch(addDropOffDate(dropOffDate,e.target.value))}
                >
                <option>WORLI</option>
                <option>CHEMBUR</option>
                <option>POWAI</option>
                </StyledSelectText>

                <StyledInputText 
                id="dropOffDate"
                name="dropOffDate"
                type="date"
                value={dropOffDate}
                onChange={(e)=>dispatch(addDropOffDate(e.target.value,pickupLocation))}
                >
                </StyledInputText>
            </StyledInputContainers>
            
        </StyledStepContainer>
    )
}
