import React, { Component } from 'react'
import {Container,Navbar,Nav,Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCopyright} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'

class Footer extends Component {

    render() {
        return( 
                <Navbar bg="dark" className="justify-content-between" variant="dark" fixed="bottom" >
                    <Button href="https://www.upgrad.com/" variant="dark"> Contact Us</Button>
                    <Button href="https://www.upgrad.com/" variant="dark"> ©Upgrad </Button>
                    <div>
                        <Button href="https://www.facebook.com/UpGradGlobal" variant="dark">Facebook</Button>
                        <Button href="https://twitter.com/UpGrad_Edu" variant="dark">Twitter</Button>
                    </div>
                </Navbar>
        )
    }
}

export default Footer;