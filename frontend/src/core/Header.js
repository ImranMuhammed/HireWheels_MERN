import React, { Component, useEffect } from 'react'
import {Container,Navbar,Nav,Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCar} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useSelector,useDispatch} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import User from './User'

function NavBar(props){
    const userLogin=useSelector(state=>state.userLogin)
    const{loading,userInfo,error}=userLogin;
    console.log("inside Header")
    console.log(userInfo)

    useEffect(()=>{

    },[userInfo])

    const handleSigninClick=()=>{
        props.history.push("/login")
    }

        return(
            <div> 
            
                <Navbar bg="primary" className="justify-content-between " variant="dark"  >
                    <Navbar.Brand href="/"><FontAwesomeIcon icon={faCar}/>HireWheels </Navbar.Brand>
                    <Nav >
                    {
                        userInfo!==undefined ?
                        <User firstName={userInfo.firstName} walletMoney={userInfo.walletMoney} roleName={userInfo.roleName}>   
                        </User>:
                      <Button variant="primary" onClick={handleSigninClick}>
                        Login
                        </Button>
                    }
                      
                    </Nav>
                </Navbar>
   
            </div> 
            
        )
}

export default withRouter(NavBar);