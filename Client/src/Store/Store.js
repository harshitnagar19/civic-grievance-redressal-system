import {configureStore} from '@reduxjs/toolkit'
import userDataReducer from './userDataSlice'
export const Store=configureStore({
    reducer:{
        userData:userDataReducer
    }
})