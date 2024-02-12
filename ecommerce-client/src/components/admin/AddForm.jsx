import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { requestAddUser } from '../../client/apiRequest';

const AddUserForm = ({ onCancel, token, onLoad }) => {
    const initialUserState = {
        email: '',
        password: '',
        fullName: '',
        role: 'BUYER',
        locked: false,
        enabled: true,
        provider: 'local',
        providerId: null,
        imageUrl: null,
        address: '',
        phoneNumber: '',
    };

    const [newUser, setNewUser] = useState(initialUserState);
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()
        try {
            const res = await requestAddUser(token, newUser)
            if (res.status != "ok") {
                toast.error(res.message)
                return
            }
            console.log(res)
            toast.success(res.data)
            onLoad()
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
        // onSubmit(newUser);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-75 ">
            <div className="bg-white p-4 rounded shadow w-full max-w-[700px] max-auto">
                <h2 className="mb-4 text-center text-red-500 font-semibold text-2xl">Add User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                            <input className="border p-2 w-full" type="email" id="email" name="email" value={newUser.email} onChange={handleChange} />
                        </div>
                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                            <input className="border p-2 w-full" type="password" id="password" name="password" value={newUser.password} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">Full Name</label>
                            <input className="border p-2 w-full" type="text" id="fullName" name="fullName" value={newUser.fullName} onChange={handleChange} />
                        </div>
                        <div className='w-1/2'>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
                            <input className="border p-2 w-full" type="text" id="phoneNumber" name="phoneNumber" value={newUser.phoneNumber} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex mb-2 gap-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="role">Role</label>
                            <select className="border p-2 w-full" id="role" name="role" value={newUser.role} onChange={handleChange}>
                                <option value="ADMIN">Admin</option>
                                <option value="BUYER">Buyer</option>
                                <option value="SELLER">Seller</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="enabled">Enabled</label>
                            <select className="border p-2 w-full" id="enabled" name="enabled" value={newUser.enabled} onChange={handleChange}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="locked">Locked</label>
                            <select className="border p-2 w-full" id="locked" name="locked" value={newUser.locked} onChange={handleChange}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>

                    </div>
                    <div className="flex mb-2 gap-4">

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Address</label>
                        <input className="border p-2 w-full" type="text" id="address" name="address" value={newUser.address} onChange={handleChange} />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" type="submit">Save</button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserForm;
