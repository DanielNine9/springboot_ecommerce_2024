import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { requestRegister } from '../../client/apiRequest';
import { toast } from 'react-toastify';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

const Register = () => {
    const navigate = useNavigate()


    const [eyeOpen, setEyeOpen] = useState(false);

    const [errorRegister, setErrorRegister] = useState('');
    const [email, setEmail] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPasswordRegister, setErrorPasswordRegister] = useState('');
    const [errorFullname, setErrorFullname] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [loading, setLoading] = useState(false);

    

    const hiddenAllError = () => {
        setErrorRegister('')
        setErrorEmail('')
        setErrorPasswordRegister('')
        setErrorFullname('')
        setErrorPhoneNumber('')
        setErrorAddress('')

    }


    const changeEyeOpen = () => {
        setEyeOpen(!eyeOpen)
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (email.length == 0) {
            setErrorEmail("Email không được để trống")
        }
        if (passwordRegister.length == 0) {
            setErrorPasswordRegister("Mật khẩu không được để trống")
        }
        if (fullName.length == 0) {
            setErrorFullname("Họ và tên không được để trống")
        }
        if (phoneNumber.length == 0) {
            setErrorPhoneNumber("Số điện thoại không được để trống")
        }
        if (address.length == 0) {
            setErrorAddress("Địa chỉ không được để trống")
        }
        if (email.length != 0
            && passwordRegister.length != 0
            && fullName.length != 0
            && phoneNumber.length != 0
            && address.length != 0) {
            setLoading(true)

            try {
                const res = await requestRegister({ email, password: passwordRegister, fullName, phoneNumber, address })
                hiddenAllError()
                console.log(res)
                if (res.status == "ok") {
                    toast.success("Đăng ký thành công")
                    navigate("/login")
                } else {
                    setErrorRegister(res.message)
                }
            } catch (error) {
                console.log(error)
                toast.error("Một lỗi không mong muốn xảy ra")
            }
            finally {
                setLoading(false)
            }

        }
    }

    return (
        <div>
            <div className={` flex justify-center items-center h-[500px] w-full`}>
                Đăng ký
                <div className={`w-3/4 max-w-3xl bg-white px-6 py-10 z-40 absolute transform duration-1000`}>
                    <p className='text-lg text-red-500'>{errorRegister}</p>
                    <h2 className='text-2xl font-semibold text-black mb-2'>ĐĂNG KÝ</h2>
                    <form className='flex flex-col gap-2 mb-2'>
                        <div>
                            <p className='flex gap-2 text-sm'>Email <div className='text-red-400'>*</div></p>
                            <input

                                disabled={loading}
                                type="text"
                                value={email}
                                onChange={(e) => {
                                    setErrorEmail("")
                                    setErrorRegister("")
                                    setEmail(e.target.value)
                                }}
                                className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg'
                            />
                            <p className='text-sm text-red-500'>{errorEmail}</p>
                        </div>
                        <div>
                            <p className='flex gap-2 text-sm'>Mật khẩu <div className='text-red-400'>*</div></p>
                            <div className='w-full border border-gray-400 py-2 px-2 text-sm focus:shadow-lg flex items-center'>
                                <input
                                    disabled={loading}
                                    type={eyeOpen ? "text" : "password"}
                                    value={passwordRegister}
                                    onChange={(e) => {
                                        setErrorRegister("")
                                        setErrorPasswordRegister("")
                                        setPasswordRegister(e.target.value)
                                    }}
                                    className='w-full outline-none'
                                />
                                {eyeOpen ?
                                    <RiEyeLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                                    :
                                    <RiEyeCloseLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                                }
                            </div >
                            <p className='text-sm text-red-500'>{errorPasswordRegister}</p>

                        </div>
                        <div className='flex gap-4 w-full'>
                            <div className='w-full'>
                                <p className='flex gap-2 text-sm'>Họ và tên <div className='text-red-400'>*</div></p>
                                <input
                                    disabled={loading}
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => {
                                        setErrorRegister("")
                                        setErrorFullname("")
                                        setFullName(e.target.value)
                                    }}
                                    className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg'
                                />
                                <p className='text-sm text-red-500'>{errorFullname}</p>

                            </div>
                            <div className='w-full'>
                                <p className='flex gap-2 text-sm'>Số điện thoại <div className='text-red-400'>*</div></p>
                                <input
                                    disabled={loading}
                                    maxLength={12}
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setErrorRegister("")
                                        setErrorPhoneNumber("")
                                        setPhoneNumber(e.target.value)
                                    }}
                                    className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg'
                                />
                                <p className='text-sm text-red-500'>{errorPhoneNumber}</p>

                            </div>
                        </div>

                        <div>
                            <p className='flex gap-2 text-sm'>Địa chỉ <div className='text-red-400'>*</div></p>
                            <input
                                disabled={loading}
                                type="text"
                                value={address}
                                onChange={(e) => {
                                    setErrorRegister("")
                                    setErrorAddress("")
                                    setAddress(e.target.value)
                                }}
                                className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg'
                            />
                            <p className='text-sm text-red-500'>{errorAddress}</p>

                        </div>
                        <button disabled={loading} onClick={handleRegister} className={`px-1 py-1 ${loading ? "bg-red-500 cursor-default" : "bg-red-700 cursor-pointer"}  text-white w-36 hover:bg-red-500'`}>{loading ? "Đăng ký..." : "Đăng ký"}</button>
                    </form>
                    <p className='text-sm cursor-pointer flex gap-2'>Bạn đã có tài khoản? <div className='text-red-500 hover:text-red-400'
                        onClick={() => navigate("/login")}>Đăng nhập</div></p>
                </div>



            </div>

        </div>
    )
}

export default Register