import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  isLog:false,
  currentUser:null,
  userData:[],
  userName:"",
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
    },
    signupData:(state,action)=>{
      state.userData=action.payload;
    },
    currUserName:(state,action)=>{
      state.userName = action.payload;
    }
  },
});

export const { toggle,isLogin,setUser,logoutUser,signupData,currUserName } = showL.actions;
export default showL.reducer;
  