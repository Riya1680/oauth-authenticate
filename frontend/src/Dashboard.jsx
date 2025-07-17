import React from 'react'
import API from "./axiosInstance";


const Dashboard = ({user, setUser}) => {

  const handleLogout = async () => {
  await API.post("/api/auth/logout");
  setUser(null);
};

  return (
     <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Welcome, {user.name} 🎉</h1>
      <img src={user.avatar} alt="avatar" className="rounded-full w-24 h-24 mx-auto mt-4" />
      <p className="mt-2 text-gray-600">{user.email}</p>
      <button className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-400 mt-3 transition-all duration-200 shadow-md"
      onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
