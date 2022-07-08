import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    
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
    if (user.email === '' && user.password === '')
      return setUser({ ...user, errorEmail: true, errorPassword: true })
    if (user.email === '') return setUser({ ...user, errorEmail: true })
    if (user.password === '') return setUser({ ...user, errorPassword: true })
    navigate('/home')
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
