 import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import {USER} from '../constants/UserConstants'
import {signUp} from '../redux/actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import {withRouter} from 'react-router-dom'

 function SignUp(props) {
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[email,setEmail]=useState('');
    const[mobileNo,setMobileNo]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')

    const[errors,setErrors]=useState({
        firstName:'',
        lastName:'',
        email:'',
        mobileNo:'',
        password:'',
        confirmPassword:''

    })

    const userLogin=useSelector(state=>state.userLogin)
    const{loading,userInfo,error}=userLogin;

    const dispatch=useDispatch()

    const[isErrorAvailable,setIsErrorAvailable]=useState(true);

    useEffect(()=>{
        if(userInfo){
         props.history.push("/booking")
         
        }
    },[userInfo])

    const handleChange=(e)=>{
        e.preventDefault();
        let id=e.target.id;
        let value=e.target.value;
        switch(id){
            case USER.FIRST_NAME:  // setErrors({...errors,firstName:(value==""?"First Name cannot be blank":"")})
                                    errors.firstName=(value==""?"First Name cannot be blank":"")
                                    setFirstName(value)
                                    break;
            case USER.LAST_NAME:  // setErrors({...errors,lastName:(value==""?"Last Name cannot be blank":"")})
                                    errors.lastName=(value==""?"Last Name cannot be blank":"")
                                    setLastName(value)
                                    break;
            case USER.EMAIL :      // setErrors({...errors,email:(value=="" || !value.includes("@"))?"Invalid Email":""})
                                    errors.email=(value=="" || !value.includes("@"))?"Invalid Email":"";
                                    setEmail(value);
                                    break;
            case USER.MOBILE_NO :  // setErrors({...errors,mobileNo:(value.length<10 || value.length>10)?"Mobile number should contain exact 10 digits":""})
                                    errors.mobileNo=(value.length<10 || value.length>10)?"Mobile number should contain exact 10 digits":"";
                                    setMobileNo(value);
                                    break;
            case USER.PASSWORD:    // setErrors({...errors,password:(value=="" || value.length<5)?"Password cannot be blank or less than 5 characters":""});
                                    errors.password=(value=="" || value.length<5)?"Password cannot be blank or less than 5 characters":""
                                    setPassword(value)
                                    break;
        case USER.CONFIRM_PASSWORD: //setErrors({...errors,confirmPassword:(value!=password)?"Confirm password is not matching with Password":""});
                                    errors.confirmPassword=(value!=password)?"Confirm password is not matching with Password":""
                                    setConfirmPassword(value)
                                    break;
                    default :       return "Invalid Data provided"
                                                 
        }
        setIsErrorAvailable(false)
        for(let prop in errors){
            if(errors[prop].length>0){
                setIsErrorAvailable(true)

            }
        }
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(signUp(firstName,lastName,email,mobileNo,password))
    }

    return (
        <div className="card-container">
        <Card style={{width:25+"rem"}}>
            <Card.Body>
                <Form>
                    <Form.Group controlId={USER.FIRST_NAME}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(e)=>handleChange(e)} />
                        {errors[USER.FIRST_NAME]!=="" && <Form.Label className="btn-danger">{errors[USER.FIRST_NAME]}</Form.Label>}
                    </Form.Group>

                    <Form.Group controlId={USER.LAST_NAME}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={(e)=>handleChange(e)} />
                        {errors[USER.LAST_NAME]!=="" && <Form.Label className="btn-danger">{errors[USER.LAST_NAME]}</Form.Label>}
                    </Form.Group>
                  
                    <Form.Group controlId={USER.EMAIL}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>handleChange(e)} />
                        {errors[USER.EMAIL]!=="" && <Form.Label className="btn-danger">{errors[USER.EMAIL]}</Form.Label>}
                    </Form.Group>

                    <Form.Group controlId={USER.MOBILE_NO}>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="Number" placeholder="Enter Mobile Number" value={mobileNo} onChange={(e)=>handleChange(e)} />
                        {errors[USER.MOBILE_NO]!=="" && <Form.Label className="btn-danger">{errors[USER.MOBILE_NO]}</Form.Label>}
                    </Form.Group>

                    <Form.Group controlId={USER.PASSWORD}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>handleChange(e)}/>
                        {errors[USER.PASSWORD]!=="" && <Form.Label className="btn-danger">{errors[USER.PASSWORD]}</Form.Label>}
                    </Form.Group>

                    <Form.Group controlId={USER.CONFIRM_PASSWORD}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="ConfirmPassword" value={confirmPassword} onChange={(e)=>handleChange(e)}/>
                        {errors[USER.CONFIRM_PASSWORD]!=="" && <Form.Label className="btn-danger">{errors[USER.CONFIRM_PASSWORD]}</Form.Label>}
                    </Form.Group>

                    <Button onClick={(e)=>submitHandler(e)} disabled={isErrorAvailable} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>    
        </div>
    )
}

export default withRouter(SignUp) 