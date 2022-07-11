import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUsers } from '../../redux/slice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: '',
    password: '',
    errorEmail: false,
    errorPassword: false,
  })

  let navigate = useNavigate()

  //updating user details on Change..

  const updateUser = (e) => {
    setUser((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
        errorEmail: false,
        errorPassword: false,
      }
    })
  }

  //validating form on submit

  const handleSubmit = (e) => {
    e.preventDefault()
    // if (user.email === '' && user.password === '')
    //   return setUser({ ...user, errorEmail: true, errorPassword: true })
    // if (user.email === '') return setUser({ ...user, errorEmail: true })
    // if (user.password === '') return setUser({ ...user, errorPassword: true })


    let userData =        {client_id: 'Cg6AwcBmbEtD0mF0smvZz68VVwZ1VV2VSFRfWoUr',
    client_secret: '1yXxXarBiP7jl4ZcPgnbSsCmxCtxzybNQYsgiSaw0M21h97O9oQ606LpX2kSfTYW7G0sHFXaoOlxEj4JsSd7OzxzitfRPzXDTCDFwZVECBC1OEEIKbA1OtNoH2MbpPD4',
    grant_type: 'password',
    password: "Vinu@04682353924",
    username:'testuser001eva@gmail.com'}

    let config = {
      method: 'post',
      url: 'https://api-65-0-106-20.cormentor.com/api/v1/login',
      data: formData,
    }

    axios
      .post('https://api-65-0-106-20.cormentor.com/api/v1/login',userData)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err))
    // dispatch(setUsers(2))
    // navigate('/home')
  }

  return (
    <div className='login'>
      <div className='loginCard'>
        <img
          src='https://www.evalogical.com/themes/eva2017/assets/img/logo.svg'
          alt=''
          className='logo'
        />
        <h2 className='loginTitle'>Hello! let's get started</h2>
        <p className='loginSubTitle'>Sign in to continue.</p>
        <form className='form' onSubmit={handleSubmit}>
          <input
            onChange={updateUser}
            className={`loginInput ${user.errorEmail && 'error'}`}
            name='email'
            type='email'
            placeholder='Email'
            value={user.email}
          />
          {user.errorEmail && <span className='errorMessage'>* Required</span>}
          <input
            onChange={updateUser}
            className={`loginInput second ${user.errorPassword && 'error'}`}
            name='password'
            type='password'
            placeholder='Password'
            value={user.password}
          />
          {user.errorPassword && (
            <span className='errorMessage'>* Required</span>
          )}
          <button className='loginButton'>SIGN IN</button>
        </form>
      </div>
    </div>
  )
}

export default Login
