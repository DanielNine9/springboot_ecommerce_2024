import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestChangePassowrd } from '../../client/apiRequest';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userInfo = useSelector(state => state?.auth?.login?.userInfo);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = { currentPassword, newPassword }
 
        setLoading(true)
        try {
            console.log(request)
            const res = await requestChangePassowrd(userInfo.token, request)
            if (res.status == "ok") {
                toast.success(res.data)
            } else {
                toast.error(res.message)
            }
        } catch (err) {
            toast.error("An unexpected occured")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (userInfo == null) {
            navigate("/login")
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded-lg w-full mx-auto">
            <h2 className="text-xl font-semibold mb-6">Change Password</h2>
            {userInfo.auth != "local" && userInfo.auth != "admin" ?
                (
                    <div className='flex justify-center items-center'>
                        {"This account logged with the social " + userInfo.provider}
                    </div>
                )
                :
                (
                    <div>
                        <div className="mb-6">
                            <label className="block mb-1">Current Password</label>
                            <input className="outline-none p-1 border w-full border-gray-400" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-1">New Password</label>
                            <input className="outline-none p-1 border w-full border-gray-400" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-1">Confirm Password</label>
                            <input className="outline-none p-1 border w-full border-gray-400" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <button className="bg-green-400 px-4 py-1 rounded-sm text-white mt-2 text-xl" type="submit">{loading ? "Saving..." : "Save"}</button>
                    </div>

                )
            }

        </form>
    );
};

export default ChangePassword;