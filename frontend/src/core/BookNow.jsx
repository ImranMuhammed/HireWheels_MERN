import React, { Component } from 'react'
import {Button, Container} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'

function BookNow (props){

    const buttonHandler=(e)=>{
        props.history.push("/book")
    }

        return(
            <div className="booknow-container">
                <div className="booknow-content">
                    <div>
                        <h3>Self-drive vehicle rental in Mumbai</h3>
                    </div>
                    <div>
                        <Button onClick={buttonHandler} style={{marginTop:20+"px"}} variant="success" size="lg" block>
                        <span style={{float:"left"}}>BOOK NOW</span>
                        <FontAwesomeIcon  className="fa-2x" style={{float:"right"}} icon={faArrowAltCircleRight}/>
                        </Button>
                    </div>
                </div>        
            </div>
        )

}

export default withRouter(BookNow)