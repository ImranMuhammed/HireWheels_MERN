import React, { useState } from 'react'
import {Container} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Login from '../login/Login'
import BookNow from './BookNow'

export default function Screen() {
    const userLogin=useSelector(state=>state.userLogin)
    const{loading,userInfo,error}=userLogin;

    return (
        <Container fluid="md">
            {userInfo!==undefined?<Login/>:<BookNow/>}

        </Container>
    )
}
