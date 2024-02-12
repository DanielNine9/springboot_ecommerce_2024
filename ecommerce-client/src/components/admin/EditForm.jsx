import React, { useState } from 'react';
import { requestEditUser } from '../../client/apiRequest';
import { toast } from 'react-toastify';

const EditUserForm = ({ user, onCancel, token, onLoad }) => {
    const [editedUser, setEditedUser] = useState(user);
    const [loading, setLoading] = useState(false)
    const handleChangeRole = (e) => {
        setEditedUser({ ...editedUser, role: e.target.value });
    };

    const handleChangeEnabled = (e) => {
        setEditedUser({ ...editedUser, enabled: e.target.value === 'true' });
    };

    const handleChangeLocked = (e) => {
        setEditedUser({ ...editedUser, locked: e.target.value === 'true' });
    };

    const handleChangePassword = (e) => {
        setEditedUser({ ...editedUser, password: e.target.value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()
        try {
            const res = await requestEditUser(token, editedUser)
            if (res.status != "ok") {
                toast.error(res.message)
                return
            }
            toast.success("Edited successfully")
            onLoad()
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);

    }
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-4 rounded shadow w-full max-w-[700px] max-auto">
                <h2 className="mb-4">Edit User</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex gap-4 w-full'>
                        <div className='w-1/2'>
                            <img className='w-full h-full shadow-lg' src={user.imageUrl} alt={user.fullName} />
                        </div>
                        {/* User details */}
                        <div className="mb-4 w-full">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2 w-full" htmlFor="email">Email</label>
                                <input className="border p-2 w-full" type="email" id="email" defaultValue={user.email} disabled />
                            </div>
                            <div >
                                <label className="block text-gray-700 font-bold mb-2 w-full" htmlFor="fullName">Full Name</label>
                                <input className="border p-2 w-full" type="text" id="fullName" defaultValue={user.fullName} />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
                                <input className="border p-2 w-full" type="text" id="phoneNumber" defaultValue={user.phoneNumber} />
                            </div>
                        </div>
                    </div>
                    {/* Role, Enabled, Locked comboboxes */}
                    <div className="flex mb-2 gap-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="role">Role</label>
                            <select value={editedUser.role} onChange={handleChangeRole} className="border p-2 w-full" id="role">
                                <option value="ADMIN">Admin</option>
                                <option value="BUYER">Buyer</option>
                                <option value="SELLER">Seller</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="enabled">Enabled</label>
                            <select value={editedUser.enabled ? 'true' : 'false'} onChange={handleChangeEnabled} className="border p-2 w-full" id="enabled">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="locked">Locked</label>
                            <select value={editedUser.locked ? 'true' : 'false'} onChange={handleChangeLocked} className="border p-2 w-full" id="locked">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    {user.provider == "admin" ?
                        (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                                <input className="border p-2 w-full" type="password" id="password" name="password" value={editedUser.password} onChange={handleChangePassword} />
                            </div>
                        )
                        : ""}

                    {/* Submit and Cancel buttons */}
                    <div className="flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" type="submit">{loading ? "Saving..." : "Save"}</button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded" type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserForm;
