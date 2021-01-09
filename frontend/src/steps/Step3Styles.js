import styled from 'styled-components'

export const StyledVehicleDetailsContainer=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-top:1rem;
    border-bottom:2px solid rgb(211,211,211);
    border-left:1px solid rgb(211,211,211);
    border-right:1px solid rgb(211,211,211);
`

export const StyledVehicleImage=styled.img`
    height:13rem;
    width: 20rem;
    margin-right:-10rem;
`

export const StyledVehicleDetails=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:left; 
`
export const StyledVehiclePrice=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    font-size:20px;
    padding-right:5rem;
    
`

export const StyledCategoryButtonContainers=styled.div`
    display:flex;
    justify-content:space-between;
`
export const StyledSelectText=styled.select`
    border-bottom:1px solid black;
    width:15rem;
    margin-bottom:2rem;
    margin-right:1rem;
`