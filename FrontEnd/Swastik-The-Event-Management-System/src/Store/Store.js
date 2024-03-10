// first install `npm install @reduxjs/toolkit react-redux` then use
import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
export default configureStore ({
    reducer :{
        authentication : authReducer
    },
})