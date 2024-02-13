import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { requestAddProduct, requestEditProduct, requestGetCategories, requestGetConfigAdmin, requestUploadImage } from '../../../client/apiRequest';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProduct = ({ product, hiddenEdit, onSuccess }) => {
    const userInfo = useSelector(state => state?.auth?.login?.userInfo);
    const [ranks, setRanks] = useState(0)
    const navigate = useNavigate()

    const [editProduct, setEditProduct] = useState(product ?? {
        "name": "",
        "description": "",
        "imageUrl": null,
        "rank": "",
    });
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        if (userInfo == null) {
            navigate("/")
        }
        getCategories();
        getConfig()
    }, []);

    const getConfig = async () => {
        const res = await requestGetConfigAdmin()
        if (res.status == "ok") {
            setRanks(res?.data?.quantityOfBestSeller)
        }
    }

    const getCategories = async () => {
        const res = await requestGetCategories();
        if (res.status === 'ok') {
            setCategories(res.data);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const storageImage = async () => {
        if (imageFile != null) {
            const res = await requestUploadImage(null, imageFile);
            if (res.status !== "ok") {
                toast.error(res.message);
                return null;
            }
            return res.data;
        }
        return null;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (userInfo != null) {

            const imageUrl = await storageImage();
            const request = {
                "id": editProduct.id,
                "name": editProduct.name,
                "description": editProduct.description,
                "imageUrl": imageUrl != null ? imageUrl : editProduct.imageUrl,
                "rank": editProduct.rank,
                "deleted": editProduct.deleted,
                "nameCategory": editProduct.productCategoryName // Corrected field name
            };
            var res = null;
            if (product != null) {
                res = await requestEditProduct(userInfo.token, request);
                if (res.status !== "ok") {
                    toast.error(res.message);
                    return;
                }
            } else {
                res = await requestAddProduct(userInfo.token, request);
                if (res.status !== "ok") {
                    toast.error(res.message);
                    return;
                }
            }

            toast.success(res?.data);
            onSuccess();
            hiddenEdit();
        }

    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setEditProduct({ ...editProduct, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append('file', file);
            setImageFile(formData);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded w-2/3 shadow-lg">
                <div className="flex justify-end">
                    <IoIosClose className='text-2xl hover:opacity-45 cursor-pointer' onClick={() => hiddenEdit()} />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-6">{product != null ? "Edit": "Add"} Product</h3>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                        <img
                            className='w-full h-full rounded-lg cursor-pointer border border-gray-200'
                            src={editProduct.imageUrl != null ? editProduct.imageUrl : "https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"}
                            alt={editProduct.name}
                            onClick={triggerFileInput}
                        />
                    </div>

                    <div className='w-full'>
                        <form className="space-y-4">
                            <div className='flex gap-2 items-center'>
                                <div className="flex gap-2 flex-col">
                                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                                    <select
                                        name="productCategoryName"
                                        id="categoryName"
                                        className='px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 '
                                        onChange={handleChange}
                                        value={editProduct.productCategoryName}
                                    >
                                        <option value={""}></option>
                                        {categories != null &&
                                            categories.map(category => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>

                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={editProduct.name}
                                        onChange={handleChange}
                                        className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                                    />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="deleted" className="block text-sm font-medium text-gray-700">Deleted</label>
                                    <select
                                        id="deleted"
                                        name="deleted"
                                        value={editProduct.deleted}
                                        onChange={handleChange}
                                        className='px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full'
                                    >
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </select>
                                </div>
                            </div>



                            <div className="space-x-4 flex">
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                                    <input
                                        type="text"
                                        id="discount"
                                        name="discount"
                                        value={editProduct.discount}
                                        onChange={handleChange}
                                        className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="rank" className="block text-sm font-medium text-gray-700">Rank</label>
                                    <select
                                        id="rank"
                                        name="rank"
                                        value={editProduct.rank}
                                        onChange={handleChange}
                                        className='px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full'
                                    >
                                        <option value=""></option>
                                        {[...Array(ranks).keys()].map((value, index) => (
                                            <option key={index} value={value + 1}>{value + 1}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={editProduct.description}
                                    onChange={handleChange}
                                    className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
