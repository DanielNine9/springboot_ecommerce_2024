import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestReceivePTK } from '../../client/apiRequest';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const [eyeOpen, setEyeOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const changeEyeOpen = () => {
        setEyeOpen(!eyeOpen);
    };
    console.log(`re-render control panel ${loading}`);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == "") {
            toast.error("Vui lòng nhập email")
            return
        }
        setLoading(true);
        try {
            for(let i = 0; i < 1000; i++){
                console.log(`${loading}`)
            }
            const res = await requestReceivePTK(email);
            if (res.status == "ok") {
                navigate("/ok-password?email=" + email);
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            toast.error('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className='flex justify-center items-center'>
            <div className={`w-3/4 max-w-3xl bg-white px-6 py-10`}>
                <h2 className='text-2xl font-semibold text-black mb-2'>LẤY LẠI MẬT KHẨU</h2>
                <form className='flex flex-col gap-2 mb-2'>
                    <div>
                        <p className='flex gap-2 text-sm'>Tên tài khoản hoặc địa chỉ email <div className='text-red-400'>*</div></p>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg' />
                    </div>
                    <button disabled={loading} onClick={handleSubmit} className={`${loading ? "bg-red-500 cursor-default" : "bg-red-700 cursor-pointer"} px-1 py-1 text-white w-36 hover:bg-red-500`}>
                        {loading ? 'Đang gửi...' : 'Gửi'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
