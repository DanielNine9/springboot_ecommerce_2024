import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestEditProfile, requestProfile } from '../../client/apiRequest';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state?.auth?.login?.userInfo);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState()

    

    const handleChangeFullName = (e) => {
        setUser({ ...user, fullName: e.target.value })
    }

    const handleChangePhoneNumber = (e) => {
        setUser({ ...user, phoneNumber: e.target.value })
    }

    const handleChangeAddress = (e) => {
        setUser({ ...user, address: e.target.value })
    }

    useEffect(() => {
        if (userInfo != null) {
            getProfile()
        } else {
            navigate("/login")
        }
    }, [])

    const getProfile = async () => {
        const response = await requestProfile(userInfo.token)
        response.data.token = userInfo.token
        setUser(response.data)
    }

    const handOnClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(user.token)
        try {
            if(user.imageUrl == null){
                user.imageUrl = ""
            }
            const res = await requestEditProfile(user)
            if (res.status != "ok") {
                toast.error(res.message)
            }
            toast.success(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white shadow-md p-4 w-full mx-auto">
            {user != null ?
                (
                    <form>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Profile</h2>
                            {/* <button className="flex items-center text-blue-500 hover:underline">
                                <FaRegEdit className="mr-1" />
                                Edit Profile
                            </button> */}
                        </div>
                        <div className="flex gap-4 w-full">
                            <div className='w-1/4 h-1/4 text-center'>
                                <img className='w-full h-full shadow-lg' src={user.imageUrl != null ? user.imageUrl : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"} alt={user.fullName} />
                                <button className='bg-blue-400 px-2 py-1 rounded-sm text-white mt-2'>Choose image</button>
                            </div>
                            <div className='w-full'>
                                <div className="mb-6 flex gap-2">
                                    <label className="block mb-1">Email</label>
                                    <p>{user.email.slice(0, 3)}*****@***{user.email.slice(user.email.length - 3)}</p>
                                    <span className='text-sm text-blue-400 hover:text-blue-500 cursor-pointer'>Edit email</span>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-1">Role</label>
                                    <p>{user.role}</p>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-1">Status</label>
                                    <div className="flex items-center">
                                        <div className={`w-4 h-4 rounded-full ${user.locked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                        <p className={`ml-2 ${user.locked ? 'text-red-500' : 'text-green-500'}`}>{user.locked ? 'Locked' : 'Enabled'}</p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-1">Provider</label>
                                    <p>{user.provider}</p>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-1">Address</label>
                                    <textarea onChange={handleChangeAddress} className='outline-none p-1 border w-1/2 border-gray-400' value={user.address != null ? user.address : "Empty"} shape="" coords="" href="" alt="" />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-1">Phone Number</label>
                                    <input onChange={handleChangePhoneNumber} className='outline-none p-1 border w-1/2 border-gray-400' value={user.phoneNumber} type="text" />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-1">Full Name</label>
                                    <input onChange={handleChangeFullName} className='outline-none p-1 border w-1/2 border-gray-400' value={user.fullName} type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <button type='submit' onClick={handOnClick} className='bg-green-400 px-4 py-1 rounded-sm text-white mt-2 text-xl'>{loading ? "Saving..." : "Save"}</button>
                        </div>

                    </form>


                )
                : ""}
        </div >
    );
};

export default UserProfile;