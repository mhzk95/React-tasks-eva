import axios from 'axios'
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_START } from './types'

let userData = {
  client_id: 'Cg6AwcBmbEtD0mF0smvZz68VVwZ1VV2VSFRfWoUr',
  client_secret:
    '1yXxXarBiP7jl4ZcPgnbSsCmxCtxzybNQYsgiSaw0M21h97O9oQ606LpX2kSfTYW7G0sHFXaoOlxEj4JsSd7OzxzitfRPzXDTCDFwZVECBC1OEEIKbA1OtNoH2MbpPD4',
  grant_type: 'password'
}

export const login =
  ({ username, password }) =>
  (dispatch) => {
    dispatch({ type: LOGIN_START })
    axios
      .post('https://api-65-0-106-20.cormentor.com/api/v1/login', {
        ...userData,
        username,
        password,
      })
      .then((res) => {
        console.log(res)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: LOGIN_FAILURE })
      })
  }
