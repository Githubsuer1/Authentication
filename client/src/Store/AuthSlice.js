import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    token:localStorage.getItem("token") || null,
    loading:false,
    error:null
};

// console.log(process.env.NODE_ENV);

const API_URL = process.env.NODE_ENV === 'production' ? 
'https://vercel.com/siddhant-mishras-projects-458b40df/auth-backend/api/v1/auth' 
:
'http://localhost:8000/api/v1/auth';


// 1. fetching user from backend via asyncthunk
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if(!token) return rejectWithValue("No token found");
    try {
        const headers = {Authorization:`Bearer ${token}`}
        const response = await axios.get(`${API_URL}/getuser`,  {headers} );
        return response.data.user;
    } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return rejectWithValue("Session expired, please log in again.");
    }
});

// 2. loginuser 
export const loginUser = createAsyncThunk('auth/loginUser', async (userData,{rejectWithValue})=>{
    try {
        const headers = {"Access-Control-Allow-Origin":"*"};
        const response = await axios.post(`${API_URL}/login`,userData,{withCredentials:true},{headers});
        localStorage.setItem("user",JSON.stringify(response.data.safeUser));
        localStorage.setItem("token",response.data.accesstoken)
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.msg || "Login failed")
    }
});

// 3. register user
export const registerUser = createAsyncThunk('auth/registerUser', async (userData,{rejectWithValue})=>{
    try {
        const headers = {"Content-Type":"application/json"}
        const response = await axios.post(`${API_URL}/register`,userData,{headers});
        // console.log(response.data);
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data.msg || "SignUp failed");
    }
});


// 4. refreshtoken evrey page reload
export const refreshAccessToken = createAsyncThunk("auth/refreshtoken", async () => {
    try {
        const response = await axios.get(`${API_URL}/refreshtoken`, { withCredentials: true });
        localStorage.setItem("token", response.data.accesstoken);
        dispatch(fetchUser());
    } catch (error) {
            // console.error("Session expired:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch(logout()); // Log out the user if refresh fails
    }
});

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },
    extraReducers:(builder)=>{
        // login 
        builder
        .addCase(loginUser.pending, (state,action)=>{
            state.loading = true;
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.user = action.payload.safeUser;
            state.token = action.payload.accesstoken;
        })

        // fetchUser

        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.user;
        })
        .addCase(fetchUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            console.log(action.payload)
        })

        // register 

        .addCase(registerUser.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            // state.token = action.payload.accesstoken;
            // state.user = action.payload.safeUser;
            // localStorage.setItem("token",action.payload.accesstoken)
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        
        // refesh token 
        // .addCase(refreshAccessToken.fulfilled, (state, action) => {
        //     state.token = action.payload;
        // });
    }
})

export const {logout} =  AuthSlice.actions;
export default AuthSlice.reducer;