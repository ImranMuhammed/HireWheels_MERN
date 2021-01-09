import React, { useEffect } from 'react'
import {StyledCategoryButtonContainers,StyledDashboardTable,StyledDashboardRow,StyledDashboardContainer,StyledVehiclePrice, StyledSelectText,StyledVehicleDetails,StyledVehicleDetailsContainer,StyledVehicleImage, } from './DashBoardStyles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import {VehicleCategory} from '../constants/stepFormConstants'
import { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getAllVehicles} from '../redux/actions/vehicleActions'
import {Link} from 'react-router-dom'
import {USER_ROLES} from '../constants/UserConstants'


export default function DashBoard(props) {
    const[category,setCategory]=useState(VehicleCategory.CAR);
    const[subCategory,setSubCategory]=useState('ALL')

    const vehiclesList=useSelector(state=>state.vehiclesList);
    const{loading,vehicles,error}=vehiclesList;

    const userLogin=useSelector(state=>state.userLogin)
    const{userInfo}=userLogin;

    const addVehicle=useSelector(state=>state.addVehicle);
    const{addSuccess,error:addError}=addVehicle

    const dispatch=useDispatch()

    useEffect(()=>{
         if(userInfo==undefined){
            props.history.push("/login")
        }
        else if(userInfo.roleName!==USER_ROLES.ADMIN){
            props.history.push("/")
        }
        else{ 
            dispatch(getAllVehicles())
        }    
    },[addSuccess])

    return (<StyledDashboardContainer>
        {addError?<h3 className="btn-danger">{addError}</h3>:null}
        <h1 className="center-items" style={{textDecoration:"underline"}} >Available Vehicles</h1>
        <StyledCategoryButtonContainers>
                <Link 
                    onClick={()=>props.history.push('/')}>
                    Back to home
                </Link>
                <Button 
                    variant={category==VehicleCategory.BIKE?'primary':'outline-primary'} 
                    onClick={()=>props.history.push("/admin/addvehicle")}>
                    + Add new vehicle
                </Button>
        </StyledCategoryButtonContainers>
            {   error ? <h3>{error}</h3> :
                loading ? <FontAwesomeIcon icon={faSpinner} className="fa-8x fa-pulse center-items"/>:
                (           
                    <StyledDashboardTable className="table">
                        <thead className="thead-dark">
                            <th>Image</th>
                            <th >Vehicle Model</th>
                            <th>Vehicle Number</th>
                            <th>Vehicle sub-category</th>
                            <th>Vehicle-Fuel type</th>
                        </thead>
                        <tbody>
        {
            vehicles!==undefined &&  vehicles.map(vehicle=>{
                return(<>
                    <tr>

                        <td style={{padding:1+"rem"}}><StyledVehicleImage src={vehicle.vehicleImage}></StyledVehicleImage></td>   
                            <td >
                                {vehicle.vehicleModel}
                            </td>
                            <td>
                                {vehicle.vehicleNumber}
                            </td>
                            <td>
                                {vehicle.vehicleSubCategory}
                            </td>
                            <td>
                                {vehicle.vehicleFuelType}
                            </td>
                    </tr>
               </> )
               
            })
            
        }
        </tbody>
        </StyledDashboardTable>
                )
             }
   
</StyledDashboardContainer>
    )
}
