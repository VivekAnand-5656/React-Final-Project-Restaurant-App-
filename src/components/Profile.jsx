import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import person from '../images/person.png'

const Profile = () => {
    const curUser = useSelector((state)=>state.showLogin.currentUser);

  return (
    <div className="w-[90vw] bg-[#F1F3F6] mt-[13vh] flex-col mx-auto py-10 flex justify-center items-center ">
        <h1>Hello "{curUser.name}"</h1>
        <div className=' w-[30%] h-[50vh] flex flex-col justify-around items-center p-2 rounded bg-[#fff] shadow-2xl  ' >
            <img src={person} 
            className=' w-[100px] h-[100px] rounded-[50%] shadow-sm '
             alt="" />
            <div>
                <h1>Name :- <span>{curUser.name}</span> </h1>
            <h1>Email :- <span>{curUser.email}</span> </h1>
            <h1>Mobile :- <span>{curUser.mobile}</span> </h1>
            </div>
        </div>
    </div>
  )
}

export default Profile
// sb complete hai bs profile togle krna hai 
