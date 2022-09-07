import React, { useEffect } from 'react'
import { getApiData } from '../redux/action'
import { useDispatch,useSelector } from 'react-redux'

const AboutFunction = () => {
    const details = useSelector((state) => state.auth.apiData)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getApiData())
    },[])

  return (
    <div>
        <h1>About</h1>
        <p dangerouslySetInnerHTML={{__html: details}}></p>
    </div>
  )
}

export default AboutFunction