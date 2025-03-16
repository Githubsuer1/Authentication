import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Store/AuthSlice.js'

const Store = configureStore({
    reducer:{
        "auth":authReducer,
    }
})

export default Store;