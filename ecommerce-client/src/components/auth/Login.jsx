import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { requestLogin, requestOauth2 } from '../../client/apiRequest';
import { toast } from 'react-toastify';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_OAUTH2_URL } from '../constants';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { authNavigate } from '../../utils/authNavigate';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('admin@gmail.com');
    const [password, setPassword] = useState('12341234');
    const [errorLogin, setErrorLogin] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [eyeOpen, setEyeOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const login = useSelector(state => state?.auth?.login)


    const hiddenAllError = () => {
        setErrorLogin('')
        setErrorUsername('')
        setErrorPassword('')
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        if (username.length == 0) {
            setErrorUsername("Email không được để trống")
        }
        if (password.length == 0) {
            setErrorPassword("Password không được để trống")
        }
        if (username != 0 && password != 0) {
            hiddenAllError()
            setLoading(true)
            try {
                const res = await requestLogin({ email: username, password }, dispatch)
                if (res.status == "ok") {
                    const decodedHeader = jwtDecode(res.data.token);
                    authNavigate(res.data.token, navigate)
                } else {
                    setErrorLogin(res.message)
                }
            } catch (err) {
                toast.error("Có lỗi không mong muốn xảy ra")
            } finally {
                setLoading(false)
            }


        }

    }

    const changeEyeOpen = () => {
        setEyeOpen(!eyeOpen)
    }

    const handleForgetPassword = () => {
        navigate("/forget-password")
    }

    return (
        <div className={`flex justify-center items-center h-[500px] w-full`}>
            <div className={` flex justify-center items-center z-30 h-full w-full`}>
                <div className={`w-3/4 max-w-3xl bg-white px-6 py-10`}>
                    <p className='text-lg text-red-500'>{errorLogin}</p>
                    <h2 className='text-2xl font-semibold text-black mb-2'>ĐĂNG NHẬP</h2>
                    <form className='flex flex-col gap-2 mb-2'>
                        <div>
                            <p className='flex gap-2 text-sm'>Tên tài khoản hoặc địa chỉ email <div className='text-red-400'>*</div></p>
                            <input value={username} onChange={(e) => {
                                setErrorUsername('')
                                setErrorLogin("")
                                setUsername(e.target.value)
                            }} type="text" className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg' />
                            <p className='text-sm text-red-500'>{errorUsername}</p>
                        </div>
                        <div>
                            <p className='flex gap-2 text-sm'>Mật khẩu <div className='text-red-400'>*</div></p>
                            <div className='w-full  border border-gray-400 py-2 px-2 text-sm focus:shadow-lg flex items-center'>
                                <input value={password} onChange={e => {
                                    setErrorLogin("")
                                    setPassword(e.target.value)
                                    setErrorPassword("")
                                }} type={eyeOpen ? "text" : "password"} className='w-full outline-none' />
                                {eyeOpen ?
                                    <RiEyeLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                                    :
                                    <RiEyeCloseLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                                }
                            </div >
                            <p className='text-sm text-red-500'>{errorPassword}</p>
                        </div>
                        <div className="flex justify-between">
                            <div className='flex text-sm gap-2'><input type="checkbox" /> Ghi nhớ mật khẩu</div>
                            <p onClick={handleForgetPassword} className='text-red-500 text-sm hover:text-red-400 cursor-pointer'>Quên mật khẩu?</p>
                        </div>
                        <button onClick={handleLogin} className='px-1 py-1 bg-red-700 text-white w-36 hover:bg-red-500'>{loading ? "Đăng nhập..." : "Đăng nhập"}</button>
                        <div className='text-sm'>Bạn chưa có tài khoản <span onClick={() => navigate("/register")} className='text-red-500 cursor-pointer hover:text-red-400'>Đăng ký</span></div>
                    </form>
                    <hr />
                    <div className='flex gap-4 mt-2'>
                        <a className='border flex justify-center gap-2 items-center px-5 w-36 py-1' href={`${process.env.REACT_APP_API_SERVER_URI}`}><FaFacebook className='text-blue-500' /> Facebook</a>
                        <a className='border flex justify-center gap-2 items-center px-5 w-36 py-1' href={GOOGLE_OAUTH2_URL}><FaGoogle className='' /> Google</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login