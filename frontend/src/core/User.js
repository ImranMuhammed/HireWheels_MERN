import React from 'react'
import {USER_ROLES} from '../constants/UserConstants'
import Nav from 'react-bootstrap/Nav'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../redux/actions/UserActions'
import {withRouter } from 'react-router-dom'



 function User(props) {
    const[showList,setShowList]=useState(false)

    const dispatch=useDispatch();

    const handleClick=()=>{
        setShowList(prevState=>!prevState)
    }

    const logoutHandler=()=>{
        dispatch(logout())
        props.history.push("/")
    }

    return (
        <Nav defaultActiveKey="/" className="flex-column" >
            <Nav.Link onClick={handleClick}  style={{color:"white"}}>{props.firstName}</Nav.Link>
            {
                showList &&
                <div >
                    {props.roleName===USER_ROLES.ADMIN && <Nav.Link href="/admin/dashboard"  onClick={handleClick} eventKey="link-1" style={{color:"white"}}>DashBoard</Nav.Link>}
                    {props.roleName!==USER_ROLES.ADMIN && <Nav.Link onClick={handleClick} eventKey="link-1" style={{color:"white"}}>{props.walletMoney}</Nav.Link>}
                    <Nav.Link onClick={logoutHandler} eventKey="link-2" style={{color:"white"}}>Logout</Nav.Link>
                </div>
            }
            
        </Nav>
    )
}

export default withRouter(User)