import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedIn:false,
        senderEmail:'',
        token:null,
    },
    reducers:{
        login(state,action){
            state.isLoggedIn = true;
            state.senderEmail = action.payload.email;
            state.token = action.payload.token;

            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('senderEmail',action.payload.email);
        },
        logout(state){
            state.isLoggedIn = false;
            state.senderEmail = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('senderEmail');

        },
        revivePage(state,action){
            state.isLoggedIn = true;
        }
    }
})

export const  authActions = authSlice.actions;
export default authSlice.reducer;