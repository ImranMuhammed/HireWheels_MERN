import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import SignIn from './SignIn'
import SignUp from './SignUp'
import {withRouter} from 'react-router-dom'

function Login(props) {
    const[signinSelected,setSigninSelected]=useState(true)
    const[signupSelected,setSignupSelected]=useState(false);
    const[show,setShow]=useState(true);

    const handleSignInSelected=()=>{

        setSigninSelected(prevState=>!prevState)
        setSignupSelected(prevState=>!prevState)
    }

    const handleSignUpSelected=()=>{
        setSigninSelected(prevState=>!prevState)
        setSignupSelected(prevState=>!prevState)
    }

    return (
        <div>
            <Modal 
                show={show} 
                onHide={()=>setShow(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton onClick={()=>{props.history.push("/booking")}}>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Button variant={signinSelected?"dark":"light"} onClick={()=>handleSignInSelected()}>Sign-In</Button>
                        <Button variant={signupSelected?"dark":"light"} onClick={()=>handleSignUpSelected()}>Sign-Up</Button>
                    </div>
                    {signinSelected?<SignIn/>:null}
                    {signupSelected?<SignUp/>:null}
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    {signinSelected ?
                    <div>Don't have an account yet?
                    <Button variant="link" onClick={()=>handleSignUpSelected()} >Sign Up</Button>
                     </div>
                    :<div>Already have an account?
                    <Button variant="link" onClick={()=>handleSignInSelected()} >Sign In</Button>
                     </div>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default withRouter(Login)