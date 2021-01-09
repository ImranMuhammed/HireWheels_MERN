import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons'
import {useDispatch,useSelector} from 'react-redux'
import {addVehicle} from '../redux/actions/vehicleActions'
import {withRouter,Link} from 'react-router-dom'
import {USER_ROLES} from '../constants/UserConstants'
import {VEHICLE_CATEGORY,CAR_SUB_CATEGORY,BIKE_SUB_CATEGORY,VEHICLE_LOCATION,VEHICLE_FUEL_TYPE,VEHICLE} from '../constants/VehicleConstants'

 function AddNewVehicle(props) {

    const[model,setModel]=useState('');
    const[number,setNumber]=useState('CAR');
    const[category,setCategory]=useState('');
    const[subCategory,setSubCategory]=useState('')
    const[location,setLocation]=useState('')
    const[color,setColor]=useState('');
    const[fuelType,setFuelType]=useState('')
    const[price,setPrice]=useState('')
    const[image,setImage]=useState('')

    const[errors,setErrors]=useState({
                                    model:'',
                                    number:'',
                                    category:'',
                                    subCategory:'',
                                    location:'',
                                    color:'',
                                    fuelType:'',
                                    price:'',
                                    image:''
                            })

        let isErrorAvailable=true;

        const userLogin=useSelector(state=>state.userLogin)
        const{userInfo}=userLogin;

         const dispatch = useDispatch()

          useEffect(()=>{
            if(userInfo==undefined){
               props.history.push("/login")
           }
           else if(userInfo.roleName!==USER_ROLES.ADMIN){
               props.history.push("/")
           }  
       },[]) 

    const handleChange=(e)=>{
        e.preventDefault();
        let id=e.target.id;
        let value=e.target.value;
        switch(id){
            case VEHICLE.MODEL: 
                                    errors.model=(value==""?"Vehicle Model cannot be blank":"")
                                    setModel(value)
                                    break;
            case VEHICLE.NUMBER:  
                                    errors.number=(value==""?"Vehicle Number cannot be blank":"")
                                    setNumber(value)
                                    break;
            case VEHICLE.CATEGORY : 
                                    errors.category=(value==VEHICLE_CATEGORY.SELECT_VEHICLE_CATEGORY?"Category cannot be blank":"")
                                    setCategory(value);
                                    break;
            case VEHICLE.COLOR :  
                                    errors.color=(value==''?"Vehicle color is required":"")
                                    setColor(value);
                                    break;
            case VEHICLE.FUEL_TYPE:   
                                    errors.fuelType=(value==VEHICLE_FUEL_TYPE[0])?"Fuel type is required":""
                                    setFuelType(value)
                                    break;
            case VEHICLE.LOCATION:
                                    errors.location=(value==VEHICLE_LOCATION[0])?"Location is required":"";
                                    setLocation(value)
                                    break;
            case VEHICLE.IMAGE:
                                    errors.image=(value=="")?"Vehicle image URL required":"";
                                    setImage(value)
                                    break;
            case VEHICLE.PRICE:
                                    errors.price=(value=="")?"Vehicle Price is required":"";
                                    setPrice(value)
                                    break;
            case VEHICLE.SUB_CATEGORY:
                                    errors.subCategory=(value==CAR_SUB_CATEGORY[0])?"Vehicle Sub Category is required":"";
                                    setSubCategory(value)
                                    break;
        
                    default :       return "Invalid Data provided"
                                                 
        }
       
        isErrorAvailable=false;
        for(let prop in errors){
            if(errors[prop].length>0){
                isErrorAvailable=true;
            }
        }

    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(addVehicle(model,category,subCategory,number,color,location,image,price,fuelType));
        props.history.push("/admin/dashboard")
    }

    return (
        <div>
            <Link to="/admin/dashboard"><FontAwesomeIcon icon={faLongArrowAltLeft} style={{marginTop:2+"rem",marginLeft:1+"rem"}}/> Back to DashBoard</Link>
            <form onSubmit={submitHandler} style={{margin:1+"rem"}}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="model">Vehicle Model</label>
                    <input type="text" className="form-control" id="model" placeholder="Vehicle Model" onChange={(e)=>handleChange(e)}/>
                    {errors.model!=="" && <div style={{color:"red"}}>{errors.model}</div>}
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="number">Vehicle Number</label>
                    <input type="text" className="form-control" id="number" placeholder="Vehicle Number" onChange={(e)=>handleChange(e)}/>
                    {errors.number!=="" && <div style={{color:"red"}}>{errors.number}</div>}
                    </div>
                </div>
                <div  className="form-row">   
                    <div className="form-group col-md-4">
                        <label htmlFor="category">Vehicle Category</label>
                        <select id="category" className="form-control" onChange={(e)=>handleChange(e)}>
                            <option>{VEHICLE_CATEGORY.SELECT_VEHICLE_CATEGORY}</option>
                            <option>{VEHICLE_CATEGORY.CAR}</option>
                            <option>{VEHICLE_CATEGORY.BIKE}</option>
                        </select>
                        {errors.category!=="" && <div style={{color:"red"}}>{errors.category}</div>}
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="subCategory">Vehicle Sub-Category</label>
                        <select id="subCategory" className="form-control" onChange={(e)=>handleChange(e)}>
                            {   category===VEHICLE_CATEGORY.CAR ?
                                CAR_SUB_CATEGORY.map(subCat=>{
                                return (
                                    <option>{subCat}</option>
                                )
                            }):
                            BIKE_SUB_CATEGORY.map(subCat=>{
                                return (
                                    <option>{subCat}</option>
                                )
                            })
                            } 
                        </select>
                        {errors.subCategory!=="" && <div style={{color:"red"}}>{errors.subCategory}</div>}
                    </div>
                </div>
              
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="color">Vehicle Color</label>
                        <input type="text" className="form-control" id="color" onChange={(e)=>handleChange(e)}/>
                        {errors.color!=="" && <div style={{color:"red"}}>{errors.color}</div>}
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="location">Vehicle Location</label>
                        <select id="location" className="form-control" onChange={(e)=>handleChange(e)}>
                            {VEHICLE_LOCATION.map(location=>{
                                return (
                                    <option>{location}</option>
                                )
                            })
                            }
                        </select>
                        {errors.location!=="" && <div style={{color:"red"}}>{errors.location}</div>}
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="fuelType">Vehicle Fuel Type</label>
                        <select id="fuelType" className="form-control" onChange={(e)=>handleChange(e)}>
                            {VEHICLE_FUEL_TYPE.map(type=>{
                                return (
                                    <option>{type}</option>
                                )
                            })
                            }
                        </select>
                        {errors.fuelType!=="" && <div style={{color:"red"}}>{errors.fuelType}</div>}
                    </div>
                    
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="price">Vehicle Price</label>
                        <input type="text" className="form-control" id="price" onChange={(e)=>handleChange(e)}/>
                        {errors.price!=="" && <div style={{color:"red"}}>{errors.price}</div>}
                    </div>

                    <div className="form-group col-md-7">
                        <label htmlFor="image">Vehicle Image_URL</label>
                        <input type="text" className="form-control" id="image" onChange={(e)=>handleChange(e)}/>
                        {errors.image!=="" && <div style={{color:"red"}}>{errors.image}</div>}
                    </div>
                </div>
                <button  type="submit" className="btn btn-primary">Add Vehicle</button>
            </form>
        </div>
    )
}

export default withRouter(AddNewVehicle)


{/* <Form>
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
</Form>   */}