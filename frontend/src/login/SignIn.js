import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import {userSigninValidation} from '../Validation/UserDetailsValidation.js'
import {USER} from '../constants/UserConstants'
import {useSelector,useDispatch} from 'react-redux'
import {signIn} from '../redux/actions/UserActions'
import { withRouter,Redirect, Link} from 'react-router-dom'

function SignIn(props) {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')
    const[errors,setErrors]=useState({
                            email:'',
                            password:''
                        })
    const userLogin=useSelector(state=>state.userLogin)
    const{loading,userInfo,error}=userLogin;

    const dispatch=useDispatch();

    const[isErrorAvailable,setIsErrorAvailable]=useState(true);

    useEffect(()=>{
        if(userInfo){
         props.history.push("/booking")
         
        }
    },[userInfo])

    const handleChange=async(e)=>{
        e.preventDefault();
        let id=e.target.id;
        let value=e.target.value;
        switch(id){
            case USER.EMAIL :await  setErrors({...errors,email:(value=="" || !value.includes("@"))?"Invalid Email":""})
                             await   setEmail(value);
                                break;
            case USER.PASSWORD: await setErrors({...errors,password:(value=="" || value.length<5)?"Password cannot be blank or less than 5 characters":""})
                               await setPassword(value)
                                break;
                    default : return "Invalid Data provided"
                                break;                   
        }
        await setIsErrorAvailable(false)
        for(let prop in errors){
            if(errors[prop].length>0){
                setIsErrorAvailable(true)
                break;
            }
        }
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(signIn(email,password))
    }
    
    return (
        <div className="card-container">
        <Card style={{width:25+"rem"}}>
            <Card.Body>
                <Form>
                         {loading && <div> Loading ...</div>}
                        {error && <div>{error}</div>} 
                    <Form.Group controlId={USER.EMAIL}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>handleChange(e)} />
                        {errors[USER.EMAIL]!=="" && <Form.Label className=" btn-danger">{errors[USER.EMAIL]}</Form.Label>}
                    </Form.Group>

                    <Form.Group controlId={USER.PASSWORD}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>handleChange(e)}/>
                        {errors[USER.PASSWORD]!=="" && <Form.Label className=" btn-danger">{errors[USER.PASSWORD]}</Form.Label>}
                    </Form.Group>
                    
                    <Button onClick={submitHandler} disabled={isErrorAvailable} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>    
        </div>
    )
}

export default withRouter(SignIn)