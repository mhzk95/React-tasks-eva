import React, { useEffect } from 'react'
import Nav from '../../components/navbar/Nav'
import {useDispatch,useSelector} from 'react-redux'
import {getUser} from '../../redux/slice'

const Home = () => {

  const dispatch = useDispatch()
  const [user] = useSelector(state => state.user.userDetails)
  const id = useSelector(state => state.user.id)

  useEffect(() => {
    dispatch(getUser(id))
  },[])

  console.log();

  return (
    <>
    <Nav />
    <div className='container'>
        <h1>Home Page</h1>
        <p>Email : {user?.email}</p>
        <p>Name : {user?.name}</p>
        <p>ID : {user?.id}</p>
        <p>User Role : {user?.user_role}</p>
    </div>
    </>
    
  )
}

export default Home