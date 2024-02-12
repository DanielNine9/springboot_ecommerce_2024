import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoIosCart } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthInfo } from '../../../utils/getAuthFromToken';
import { loginSuccess } from '../../../redux/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const login = useSelector(state => state?.auth?.login);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (login.userInfo != null) {
            setUser(login?.userInfo)
        }
    }, [login])
    // console.log(login)

    const handleLogout = () => {
        dispatch(loginSuccess(null))
        setUser(null)
        navigate("/login")
    }

    return (
        <div className="bg-gradient-to-t from-gray-800 to-gray-900">
            <div className="container mx-auto flex justify-between items-center py-4">
                <div onClick={() => navigate("/")} className="text-white text-3xl font-bold cursor-pointer">Ecommerce</div>
                <div className="w-1/2 flex items-center justify-between bg-white text-black px-4 py-2 rounded-sm shadow-sm">
                    <input type="text" className="border-none outline-none text-base w-full bg-transparent" placeholder="Search..." />
                    <div className="bg-red-700 px-3 py-1 text-white rounded-sm hover:bg-red-500">
                        <CiSearch className="text-2xl cursor-pointer" />
                    </div>
                </div>
                {


                    (
                        <div className="flex items-center gap-6">
                            {user != null ?
                                (
                                    <div className='relative group'>
                                        <div className='text-white text-sm font-medium flex gap-2 items-center group'>
                                            {user.fullName ? user.fullName: "No name"}
                                            <img className='h-10 w-h-10 rounded-full shadow-lg bg-contain' src={user.imageUrl ? user.imageUrl: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"} alt={user.fullName} />
                                        </div>
                                        <div className='group-hover:block bg-transparent absolute top-6 left-0 hidden h-10 w-full'></div>
                                        <div className="group-hover:opacity-100 group-hover:block w-24 top-10 opacity-0 hidden absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg py-2 px-4 transition-opacity duration-300 z-10">
                                            <div className='flex flex-col'>
                                                <button className="text-black mr-2" onClick={() => navigate("/profile/my-profile")}>Profile</button>
                                                <button className="text-black" onClick={handleLogout}>Log out</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                                : (
                                    <>
                                        <button className="text-white text-sm font-medium hover:text-gray-300" onClick={() => navigate("/login")}>Đăng nhập</button>
                                        <button className="text-white text-sm font-medium hover:text-gray-300" onClick={() => navigate("/register")}>Đăng ký</button>
                                    </>
                                )
                            }
                            <div className="text-white rounded-sm cursor-pointer bg-red-700 px-4 py-2 hover:bg-red-600 transition duration-300">
                                <IoIosCart className="text-2xl" />
                            </div>
                        </div>

                    )
                }

            </div>
        </div>
    );
};

export default Header;
