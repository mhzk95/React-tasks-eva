import React from 'react'
import Nav from '../../components/navbar/Nav'
import {useDispatch, useSelector} from 'react-redux'
import { CHANGE_COLOR } from '../../redux/types';


const Home = () => {
  const dispatch = useDispatch();
 const userData = useSelector(state => state.auth.userDetails.data)
 const color = useSelector(state => state.color.color)
const {id,email,profile,} = userData?.user
const {first_name,last_name,phone} = profile


const changeColor = () => {
  dispatch({type:CHANGE_COLOR})
}

console.log(userData,"userData");

  return (
    <>
    <Nav />
    <div className='container'>
        <h1>Home Page</h1>
        <p>Email : {email}</p>
        <p>Name : {`${first_name} ${last_name}`}</p>
        <p>ID : {id}</p>
        <p>phone : {phone}</p>
    </div>
    <div style={{backgroundColor:color ? 'red' : 'blue',width:'300px',height:'300px'}}>

    </div>
    <div className="buttonWrpr">
      <button onClick={changeColor} className="colorChangeBtn">CHANGE COLOR</button>
    </div>
    </>
    
  )
}

export default Home