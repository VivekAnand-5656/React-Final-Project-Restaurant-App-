import React from "react";
import { useSelector } from "react-redux";
import person from "../images/person.png";

const Profile = () => {  
  const curUser = useSelector((state) => state.showLogin.currentUser);

  return (
    <div className="w-full min-h-[90vh] bg-[#F1F3F6] mt-[13vh] flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
        Hello <span className="text-blue-600 font-bold">"{curUser.name}"</span>
      </h1>

      <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[30%] min-h-[45vh] flex flex-col justify-around items-center p-6 md:p-8 rounded-2xl bg-white shadow-2xl">
        {/* Profile Image */}
        <img
          src={person}
          alt="Profile"
          className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full shadow-md mb-4"
        />

        {/* User Details */}
        <div className="text-center space-y-2 text-sm md:text-base">
          <h1>
            <span className="font-semibold">Name:</span>{" "}
            <span className="text-gray-700">{curUser.name}</span>
          </h1>
          <h1>
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-gray-700">{curUser.email}</span>
          </h1>
          <h1>
            <span className="font-semibold">Mobile:</span>{" "}
            <span className="text-gray-700">{curUser.phone}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
