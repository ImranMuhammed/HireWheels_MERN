import React, { useState } from 'react'
import  Stepper from '@material-ui/core/Stepper'
import  Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from 'react-bootstrap/Button'
import {getSteps} from '../constants/stepFormConstants'
import {StyledStepContainer} from './StepFormStyles'
import Step1 from '../steps/Step1' 
import Step2 from '../steps/Step2'
import Step3 from '../steps/Step3'
import Step4 from '../steps/Step4'
import {} from '../redux/actions/BookingActions'
import {} from '../redux/actions/vehicleActions'
import {useSelector,useDispatch} from 'react-redux'
import {Link } from 'react-router-dom'

export default function StepForm() {

    const bookingData=useSelector(state=>state.bookingData);
    const{pickupDate,dropOffDate,pickupLocation,vehicle}=bookingData;

    const[activeStep,setActiveStep]=useState(0)
    const steps=getSteps();

    const backButtonHandler=()=>{
        setActiveStep(prevStep=>prevStep-1)
    }

    const nextButtonHandler=()=>{
        setActiveStep(prevStep=>prevStep+1)
    }

    const nextStep=(step)=>{
        setActiveStep(step)
    }

    const confirmButtonHandler=()=>{
        alert("Your Booking Has been confirmed");
    }

const getStepContent=(step)=>{
    switch(step){
        case 0 : return <Step1/>
        case 1 : return <Step2/>
        case 2 : return <Step3 nextStep={nextButtonHandler}/>
        case 4 : return <Step4/>
        default: return <Step4/>
    }
}

    return (
        <>
        <div style={{margin:1+"rem", marginBottom:0, fontWeight:"bold"}} >
            <Link to="/" > Back to Home</Link>
        </div>
        
        <div className="stepper-container">
            <Stepper activeStep={activeStep}>
                {
                    steps.map(step=>{
                        return(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        )  
                    })
                }
            </Stepper>
            {getStepContent(activeStep)}
            <StyledStepContainer>
                <div>
                    {activeStep!=0 ?
                    <Button style={{marginRight:1+"rem"}} variant="primary" onClick={backButtonHandler}>Back</Button>:null
                    }
                </div>
                <div>
                    {activeStep>=0 && activeStep<2?
                    <Button style={{marginRight:1+"rem"}} variant="primary" onClick={nextButtonHandler}>Next</Button>:null
                    }
                </div>
                {/* <div>
                    {activeStep===steps.length-1?
                    <Button style={{marginRight:1+"rem" ,  width:150+"px"}} variant="primary" onClick={confirmButtonHandler}>Confirm Booking</Button>:null
                    }
                </div> */}
            </StyledStepContainer>
        </div>

        </>
    )
}
