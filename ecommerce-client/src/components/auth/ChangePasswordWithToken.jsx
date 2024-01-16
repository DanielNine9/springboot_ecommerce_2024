import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { changePasswordWithPTK } from '../../client/apiRequest';
import { toast } from 'react-toastify';

const ChangePasswordWithToken = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    const [eyeOpen, setEyeOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [regLower, setRegLower] = useState(false)
    const [regUpper, setRegUpper] = useState(false)
    const [regSpecialChar, setRegSpecialChar] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()




    const changeEyeOpen = () => {
        setEyeOpen(!eyeOpen)
    }


    const handleChangeInput = (password) => {
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*()-=_+{};':"<>?,./]/;
        const passwordLengthRegex = /^.{8,16}$/;
        if (lowercaseRegex.test(password)) {
            setRegLower(true)
        } else {
            setRegLower(false)

        }

        if (uppercaseRegex.test(password)) {
            setRegUpper(true)
        } else {
            setRegUpper(false)
        }

        if (passwordLengthRegex.test(password)) {
            setRegSpecialChar(true)
        } else {
            setRegSpecialChar(false)

        }
    }
    const handleSubmit = async () => {
        if (regLower && regUpper && regSpecialChar) {
            console.log(email)
            setLoading(true)
            try {
                const res = await changePasswordWithPTK(token, { newPassword: password })
                if (res.status != undefined) {
                    navigate("/")
                } else {
                    console.log(res)
                    toast.error(res.response.data.message)
                }
            } catch (err) {
                toast.error(err)
            }
            finally {
                setLoading(false)
            }


        }

    }

    const handleLeft = () => {
        if(loading) {
            return
        }
        navigate("/")

    }


    return (
        <div>

            <div className='flex justify-center items-center flex-col w-screen h-screen '>
                <div className=' bg-white shadow-lg p-4 px-10 py-2 mt-[-100px] pb-10 relative'>
                    <FaArrowLeft onClick={handleLeft} className='absolute top-4 left-4 text-red-700 hover:text-red-400 text-lg cursor-pointer' />

                    <h2 className='text-center mb-8 text-xl mt-1'>Thiết Lập Mật Khẩu</h2>
                    <div className='flex flex-col items-center my-2'>
                        <p>Tạo mật khẩu mới cho</p>
                        <p className='text-sm text-red-500'>{email}</p>
                    </div>
                    <div className='w-full border border-gray-400 py-2 px-2 text-sm focus:shadow-lg flex items-center'>
                        <input disabled={loading} maxLength={16} value={password} onChange={e => {
                            setPassword(e.target.value)
                            handleChangeInput(e.target.value)
                        }} type={eyeOpen ? "text" : "password"} className='w-full outline-none' />
                        {eyeOpen ?
                            <RiEyeLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                            :
                            <RiEyeCloseLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                        }
                    </div >
                    <div className='text-gray-400 text-sm flex flex-col gap-1 my-4'>
                        <p className={`${password != "" && regLower ? "text-green-500" : password != "" && !regLower ? "text-red-500" : "text-gray-400"}`}>Ít nhất một kí tự viết thường.</p>
                        <p className={`${password != "" && regUpper ? "text-green-500" : password != "" && !regUpper ? "text-red-500" : "text-gray-400"}`}>Ít nhất một kí tự viết hoa.</p>
                        <p className={`${password != "" && regSpecialChar ? "text-green-500" : password != "" && !regSpecialChar ? "text-red-500" : "text-gray-400"}`}>8-16 kí tự</p>
                        <p className={`${password != "" ? "text-green-500" : "text-gray-400"}`}>Chỉ các chữ cái, số và ký tự phổ biến mới có thể được sử dụng</p>
                    </div>
                    <button onClick={handleSubmit} className='bg-red-700 text-white w-full px-4 py-1'>{loading ? "Đợi xíu...": "TIẾP TỤC"}</button>
                </div>

            </div>
        </div>
    )
}

export default ChangePasswordWithToken