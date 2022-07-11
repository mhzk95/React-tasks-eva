import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const getUser = createAsyncThunk('user/getUser',async(id) => {
    return fetch(`http://staging.evalogical.com/api/getUserDetailsbyId?id=${id}`).then(res => res.json())
})

export const userSlice = createSlice({
    name:'user',
    initialState:{
        id:'',
        userDetails:[],
        loading:false
    },
    reducers:{
        setUsers:(state,action) => {
            state.id = action.payload
        }
    },
    extraReducers:{
        [getUser.pending]: (state) => {
            state.loading=true
        },
        [getUser.fulfilled]:(state,action) => {
            state.loading=false;
            state.userDetails = action.payload.data
        },
        [getUser.rejected]: (state) => {
            state.loading = false
        }
    }
})

export const {setUsers} = userSlice.actions

export default userSlice.reducer