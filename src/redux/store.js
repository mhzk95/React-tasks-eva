// import {configureStore} from '@reduxjs/toolkit'
import reducers from './allReducers'
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default createStore(
    reducers,
    applyMiddleware(thunk)
)

// export default configureStore({
//     reducer
// })