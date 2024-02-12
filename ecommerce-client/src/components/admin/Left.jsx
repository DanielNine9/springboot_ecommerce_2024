import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { AiFillSignal } from "react-icons/ai";
import { RiProductHuntFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaAngleRight, FaAngleDown, FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Left = () => {

  const [isCategory, setIsCategory] = useState(false)
  const [isProduct, setIsProduct] = useState(false)
  const [isUser, setIsUser] = useState(false)

  const onClickCategory = () => {
    setIsCategory(!isCategory)
  }

  const onClickProduct = () => {
    setIsProduct(!isProduct)
  }
  const onClickUser = () => {
    setIsUser(!isUser)
  }

  return (
    <div className="w-1/4 text-black shadow-md h-screen text-center">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 border-b border-gray-400 pb-6 text-red-700">ADMIN MENU</h1>
        <ul className="space-y-2">
          <li className="flex justify-between hover:text-gray-600 px-3 py-2 item-parent items-center text-lg  cursor-pointer gap-2">
            <div className=' flex gap-2 items-center'>
              <AiFillSignal className='text-xl' />
              Dashboard
            </div>
          </li>
          <li onClick={onClickCategory} className={`flex justify-between px-3 py-2 item-parent hover:text-gray-600 items-center text-lg gap-2   cursor-pointer`}>
            <div className=' flex gap-2 items-center'>
              <MdDashboard className='text-xl' />
              Category
            </div>
            {isCategory ?
              <FaAngleDown className='text-sm' />
              :
              <FaAngleRight className='text-sm' />
            }
          </li>
          {
            isCategory ?
              (
                <ul className='px-2 border'>

                  <li className="flex justify-between hover:text-gray-600 items-center text-lg gap-2  cursor-pointer">
                    <Link to={"/admin/category-management"} className='px-2 py-3 w-full flex gap-2 text-sm items-center'>
                      <FaPlus className='text-sm' />
                      Category management
                    </Link>
                  </li>
                  <li className='w-full border border-gray-100'></li>
                  <li className="flex justify-between hover:text-gray-600 items-center text-lg gap-2  cursor-pointer">
                    <Link to={"/admin/create-variation"} className='px-2 py-3 w-full flex gap-2 text-sm items-center'>
                      <FaPlus className='text-sm' />
                      Create variation
                    </Link>

                  </li>
                  <li className="flex justify-between hover:text-gray-600 items-center text-lg gap-2  cursor-pointer">
                    <Link to={"/admin/list-variation"} className='px-2 py-3 w-full flex gap-2 text-sm items-center'>
                      <FaPlus className='text-sm' />
                      List variation
                    </Link>

                  </li>
                </ul>
              )
              : ""
          }
          <li onClick={onClickProduct} className="flex justify-between px-3 py-2 item-parent hover:text-gray-600 items-center text-lg gap-2  cursor-pointer">
            <div className=' flex gap-2 items-center'>
              <RiProductHuntFill className='text-xl' />
              Product management
            </div>
            {isProduct ?
              <FaAngleDown className='text-sm' />
              :
              <FaAngleRight className='text-sm' />
            }
          </li>
          {
            isProduct ?
              (
                <ul className='px-2 border'>
                  <li className="flex justify-between hover:text-gray-600 items-center text-lg gap-2  cursor-pointer">
                    <Link to={"/admin/list-product"} className=' flex gap-2px-2 py-3  text-sm items-center'>
                      <FaPlus className='text-sm' />
                      List Product
                    </Link>
                  </li>
                  <li className='w-full border border-gray-100'></li>

                </ul>
              )
              : ""
          }



          <li onClick={onClickUser} className="flex justify-between px-3 py-2 item-parent hover:text-gray-600 items-center text-lg gap-2  cursor-pointer">
            <div className=' flex gap-2 items-center'>
              <FaUser className='text-xl' />
              User management
            </div>
            {isUser ?
              <FaAngleDown className='text-sm' />
              :
              <FaAngleRight className='text-sm' />
            }
          </li>
          {
            isUser ?
              (
                <ul className='px-2 border'>
                  <li className="flex justify-between hover:text-gray-600 items-center text-lg gap-2  cursor-pointer">
                    <Link to={"/admin/user-management"} className=' flex gap-2px-2 py-3  text-sm items-center'>
                      <FaPlus className='text-sm' />
                      List User
                    </Link>
                  </li>
                </ul>
              )
              : ""
          }
          <Link to={"/admin/banner"} className="flex justify-between hover:text-gray-600 px-3 py-2 item-parent items-center text-lg gap-2  cursor-pointer">
            <div className=' flex gap-2 items-center'>
              <MdDashboard className='text-xl' />
              Banner
            </div>

          </Link>
          <Link to={"/admin/settings"} className="flex justify-between hover:text-gray-600 px-3 py-2 item-parent items-center text-lg gap-2  cursor-pointer">
            <li className=' flex gap-2 py-3 items-center'>
              <MdDashboard className='text-xl' />
              Settings
            </li>
          </Link>

        </ul>
      </div>
    </div>
  );
};

export default Left;
