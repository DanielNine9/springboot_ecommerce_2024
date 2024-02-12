import React from 'react'
import { Link } from 'react-router-dom'

const ProfileNav = () => {
    return (
            <div className="w-1/4  text-gray-900 shadow-md h-screen">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Menu</h1>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:text-gray-500 flex items-center">
                            <Link to={`/profile/my-profile`}>Profile</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-500 flex items-center">
                            <Link to={`/profile/change-password`}>Changepassword</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-500 flex items-center">
                            <Link to={`/profile/cart`}>Cart</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-500 flex items-center">
                            <Link to={`/profile/notifications`}>Notifications</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-500 flex items-center">
                            <Link to={`/profile/settings`}>Settings</Link>
                        </li>
                    </ul>
                </div>
            </div>

    )
}

export default ProfileNav