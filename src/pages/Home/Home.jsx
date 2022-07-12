import React from 'react'
import Nav from '../../components/navbar/Nav'
import {useDispatch, useSelector} from 'react-redux'


const Home = () => {
 const userData = useSelector(state => state.auth.userDetails.data)
const {id,email,profile,} = userData?.user
const {first_name,last_name,phone} = profile


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
    </>
    
  )
}

export default Home