import React, { useState } from 'react'
import { RiMailCheckLine } from "react-icons/ri";
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const OkPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const handleSubmit = (e) => {
        navigate("/")
    }

    return (
        <div>
            <div>
                <div className='flex justify-center items-center flex-col w-screen h-screen '>
                    <div className=' bg-white shadow-lg p-4 px-10 py-2 mt-[-100px] pb-10 relative flex flex-col items-center'>
                        <FaArrowLeft onClick={handleSubmit} className='absolute top-4 left-4 text-red-700 hover:text-red-400 text-lg cursor-pointer' />

                        <h2 className='text-center mb-8 text-xl mt-1'>Đặt lại mật khẩu</h2>
                        <div>
                            <RiMailCheckLine className="text-6xl" />
                        </div>
                        <div className='flex flex-col items-center text-sm mb-10'>
                            <p>Mã xác minh đã được gửi đến địa chỉ email</p>
                            <p className='text-red-500'>{email}.</p>
                            <p>Vui lòng xác minh.</p>
                        </div>
                        <button onClick={handleSubmit} className='bg-red-700 text-white w-full px-4 py-1 hover:bg-red-400'>OK</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OkPassword