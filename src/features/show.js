import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  isLog:false,
  currentUser:null,
};

const showL = createSlice({
  name: 'showLogin',
  initialState,
  reducers: {
     
    toggle: (state) => {
      state.isShow = !state.isShow;
    },
    isLogin:(state)=>{
      state.isLog = !state.isLog;
    },
    setUser:(state,action)=>{
      state.currentUser = action.payload;
    },
    logoutUser:(state)=>{
      state.currentUser = null;
    }
  },
});

export const { toggle,isLogin,setUser,logoutUser } = showL.actions;
export default showL.reducer;
  