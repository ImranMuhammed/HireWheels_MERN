import React from 'react'
import ReactDOM from 'react-dom'
import {Route,Switch,Router,BrowserRouter} from 'react-router-dom'
import Header from './core/Header'
import Footer from './core/Footer'
import Screen from './core/Screen'
import Login from './login/Login'
import SignIn from './login/SignIn'
import SignUp from './login/SignUp'
import StepForm from './core/StepForm'
import BookNow from './core/BookNow'
import DashBoard from './admin/DashBoard'
import AddNewVehicle from './admin/AddNewVehicle'

function App() {
  return (
    <React.Fragment>
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Screen}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/booking" component={BookNow}></Route>
        <Route path="/book" component={StepForm}></Route>
        <Route path="/admin/dashboard" component={DashBoard}></Route>
        <Route path="/admin/addvehicle" component={AddNewVehicle}></Route>
      </Switch>
      <Footer/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
