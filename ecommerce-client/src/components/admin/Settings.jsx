import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestGetConfigAdmin, requestUpdateConfigAdmin } from '../../client/apiRequest';
import { useSelector } from 'react-redux';

const Settings = () => {
    const userInfo = useSelector(state => state?.auth?.login?.userInfo);
    const [config, setConfig] = useState({ quantityOfBestSeller: "" });
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo == null) {
            navigate("/")
            return
        }
        const getConfig = async () => {
            const res = await requestGetConfigAdmin()
            if(res?.status == "ok"){
                setConfig(res.data)
            }else {
                toast.error(res.message)
            }
        }

        getConfig()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from e.target
        setConfig({ ...config, [name]: value }); // Use bracket notation to set dynamic property
    };



    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await requestUpdateConfigAdmin(userInfo.token, config)
        if (res?.status != "ok") {
            toast.error(res?.message)
        }else {
            toast.success(res.data)
        }
    }

    return (
        <div className='p-4 w-1/3 mx-auto'>
            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="quantityOfBestSeller">Quantity of best product</label>
                    <input
                        className='px-2 py-1 border outline-none'
                        onChange={handleChange}
                        type="text"
                        value={config.quantityOfBestSeller}
                        name="quantityOfBestSeller"
                        id="quantityOfBestSeller" // Add id for the label
                    />
                </div>
                <button type="submit" className='px-4 py-1 bg-green-700 hover:bg-green-500 text-white rounded-sm mt-2' >Submit</button>
            </form>
        </div>
    );
};

export default Settings;
