import React, { useEffect, useState } from 'react'
import { getAuthInfo } from '../../utils/getAuthFromToken'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../redux/authSlice'

const HeaderAdmin = () => {
  const [user, setUser] = useState(null)
  const login = useSelector(state => state?.auth?.login)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useEffect(() => {
  // if (user == null) {
  //   navigate("/login")
  //   toast.error("Bạn không có quyền")
  // }
  //   console.log("token >>> " + token)

  //   if (token != null) {
  //     setUser(getAuthInfo(token))
  //   }
  // }, [])
  useEffect(() => {
    if (login.token != null) {
      const userInfo = getAuthInfo(login.token)
      if (userInfo.role == "BUYER") {
        navigate("/login")
        toast.error("You are not the right " + user.role)
      }
      setUser(userInfo)
    }
  }, [login])
  const handleLogout = () => {
    dispatch(loginSuccess(null))
    setUser(null)
    navigate("/login")
  }


  return (
    <div className='flex bg-gradient-to-t from-gray-800 to-gray-900 w-full px-4 text-white py-3 justify-end'>
      <div className="flex items-center gap-2 ">
        {
          user != null ?
            (

              <div className='relative group'>
                <div className='text-white text-sm font-medium flex gap-2 items-center group'>
                  <div className='text-white text-sm font-medium hover:text-gray-30 flex gap-2 items-center'>
                    {user.fullName ? user.fullName: "No name"}
                    <img className='h-10 w-h-10 rounded-full shadow-lg bg-contain' src={user.imageUrl ? user.imageUrl : "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"} alt="" />
                  </div>
                </div>
                <div className='group-hover:block bg-transparent absolute top-6 left-0 hidden h-10 w-full'></div>
                <div className="group-hover:opacity-100 w-24 group-hover:block top-10 opacity-0 hidden absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg py-2 px-4 transition-opacity duration-300 z-10">
                  <div className='flex flex-col'>
                    <button className="text-black mr-2" onClick={() => console.log("Profile clicked")}>Profile</button>
                    <button className="text-black" onClick={handleLogout}>Log out</button>
                  </div>
                </div>
              </div>
            )
            : (
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVRFoPhSiWbB0L9aH7rT_h_Wx4c7RAPIqupA&usqp=CAU" alt="" className='rounded-full shadow-lg w-12 h-12' />
            )
        }


      </div>
    </div>
  )
}

export default HeaderAdmin