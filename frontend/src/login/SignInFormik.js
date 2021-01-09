import React from 'react'
import {Formik, Form, Field,ErrorMessage} from 'formik'
import { USER } from '../constants/UserConstants'
import * as Yup from 'yup'
import {StyledContainer} from './StyledComp'

export default function SignInFormik() {

const initialValues={
    email:'',
    password:''
}

const onSubmit=(values, onSubmitProps )=>{
    console.log(values)
    console.log("Onsubmit Props",onSubmitProps)
    onSubmitProps.setSubmitting(false) 
}
/* const validate=values=>{
    let errors={};
    if(!values.email){
        errors.email='Email is Required'
    }else if(!/^[A-Z0-9.]+@[A-Z0-9.]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email='Invalid email format'
    }

    if(!values.password){
        errors.password='Password is Required'
    }
    else if(values.password.length<5){
        errors.password='Password should have minimum length of 5 characters'
    }

    return errors;
} */

 const validationSchema=Yup.object({
    email: Yup.string().required('Email is Required!').email('Invalid email format!'),
    password: Yup.string().required('Password is Required!').min(5,'Min 5 length is required')
}) 

 /* const formik=useFormik({
    initialValues,
    onSubmit,
    validationSchema
}) */
 
    return (<>
    <StyledContainer>
        <Formik className="booknow-container"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
        >
        {formik=>{
            return(
                <Form >
                    <label htmlFor={USER.EMAIL}>Email address</label><br/>
                    <Field 
                        type="email" 
                        id={USER.EMAIL} 
                        name={USER.EMAIL} 
                        placeholder="Enter email"
                        
                    /><br/>
                    <ErrorMessage name={USER.EMAIL}>
                        {errorMessage=><div style={{color:"red"}}>{errorMessage}</div>}
                    </ErrorMessage>

                    <br/><br/>
                    <label htmlFor={USER.PASSWORD}>Password</label><br/>
                    <Field 
                        type="password" 
                        id={USER.PASSWORD}
                        name={USER.PASSWORD} 
                        placeholder="Password"
                    /><br/>
                    <ErrorMessage name={USER.PASSWORD}>
                    {errorMessage=><div style={{color:"red"}}>{errorMessage}</div>}
                    </ErrorMessage>
                    <br/>
                    <br/>
                    <button  type="submit" disabled={!formik.isValid || formik.isSubmitting }>
                        Submit
                    </button>
                </Form>
            )   
        }}
             
        </Formik>
        </StyledContainer>
        </> )
}
