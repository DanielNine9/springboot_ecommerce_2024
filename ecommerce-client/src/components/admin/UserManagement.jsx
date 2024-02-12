import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { requestGetUsers } from '../../client/apiRequest';
import Loading from '../Loading';
import EditUserForm from './EditForm';
import AddUserForm from './AddForm';

function UserManagement() {
    const userInfo = useSelector(state => state?.auth?.login?.userInfo);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);

    useEffect(() => {
        if (userInfo) {
            if (userInfo.role !== 'ADMIN') {
                console.log("Bạn không có quyền");
                return;
            }
            loadData();
        }
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await requestGetUsers(userInfo.token, email, role, address);
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    if (loading) {
        return <Loading />;
    }

    const handleEdit = (user) => {
        setSelectedUser(user);
        setOpenEditForm(true);
    };

    const handleCloseForm = () => {
        setOpenEditForm(false);
        setOpenAddForm(false);
    };


    const handLoad = () => {
        handleCloseForm()
        loadData()
    };



    return (
        <div className="p-4">
            {/* Filter section */}
            <h2 className='text-center text-2xl text-red-600 font-bold my-2'>User Management</h2>
            <div className="flex mb-4 justify-between">
                <div>
                    <input className="border p-2 mr-2" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <select className="border p-2 mr-2" value={role} onChange={e => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="BUYER">BUYER</option>
                        <option value="SELLER">SELLER</option>
                    </select>
                    <input className="border p-2 mr-2" type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={loadData}>Search</button>
                </div>
                <div>
                    <button onClick={() => setOpenAddForm(!openAddForm)} className='bg-green-500 hover:bg-green-700 px-4 py-2'>Add</button>
                </div>

            </div>

            {/* Users table */}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Address</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user.email} className="hover:bg-gray-100">
                            <td className="border text-center p-2">{user.email}</td>
                            <td className="border text-center p-2">{user.role}</td>
                            <td className="border text-center p-2">{user.address}</td>
                            <td className="border text-center p-2">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">View Details</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => handleEdit(user)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {openEditForm && (
                <EditUserForm
                    user={selectedUser}
                    onCancel={handleCloseForm}
                    token={userInfo.token}
                    onLoad={handLoad}
                />

            )}
            {openAddForm && (
                <AddUserForm
                    onCancel={handleCloseForm}
                    onLoad={handLoad}
                    token={userInfo.token}
                />
            )}
        </div>
    );
}

export default UserManagement;
