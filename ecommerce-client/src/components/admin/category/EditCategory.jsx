import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { fetchImages } from '../../../utils/fetchImage';
import { API_BASE_URL } from '../../constants';
import { edit } from '@cloudinary/url-gen/actions/animated';
import { toast } from 'react-toastify';
import { requestAddCategory, requestEditCategory, requestGetParentCategories, requestUploadImage } from '../../../client/apiRequest';

const EditCategory = ({ category, hiddenEdit, getCategoriesList }) => {
    const [editCategory, setEditCategory] = useState(category);
    const fileInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        const res = await requestGetParentCategories()
        if (res.status == 'ok') {
            console.log(category.name)
            const categories = res?.data?.filter(c => c.name != category.name)

            setCategories(categories)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditCategory({ ...editCategory, [name]: value });
    };


    const storageImage = async () => {
        if (imageFile != null) {
            const res = await requestUploadImage(null, imageFile)
            if (res.status != "ok") {
                toast.error(res.message)
                return;
            }

            return res.data
        }
        return null;
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const imageUrl = await storageImage();
        console.log(editCategory.id)
        const request = {
            "id": editCategory.id,
            "name": editCategory.name,
            "parentName": editCategory.parentName,
            "deleted": editCategory.deleted,
            "imageUrl": imageUrl != null ? imageUrl : editCategory.imageUrl,
            "top": editCategory.top
        }

        const res = await requestEditCategory(null, request);
        if (res.status != "ok") {
            toast.error(res.message)
            return
        }
        toast.success(res.data)
        getCategoriesList();
        hiddenEdit()
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setEditCategory({ ...editCategory, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append('file', file);
            setImageFile(formData)
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const onChangeSelect = (e) => {
        setEditCategory({ ...editCategory, parentName: e.target.value })
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded w-2/4">
                <div className="flex justify-end" onClick={() => hiddenEdit()}>
                    <IoIosClose className='text-2xl hover:opacity-45 cursor-pointer' />
                </div>

                <h3 className="text-lg font-semibold mb-4">Edit category with name {category.name}</h3>
                <div className="flex gap-2 w-full">
                    <div className='border w-2/4'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                        <img
                            className='h-full w-full bg-cover cursor-pointer'
                            src={editCategory.imageUrl != null && editCategory.imageUrl}
                            alt={editCategory.name}
                            onClick={triggerFileInput}
                        />
                    </div>

                    <form onSubmit={handleSave}>
                        <div>
                            <div className="flex gap-2 items-center w-full">
                                <label for="parentCategoryName">Parent name:</label>
                                <select
                                    name="parentCategoryName"
                                    id="parentCategoryName"
                                    className='outline-none border px-2 py-1'
                                    onChange={onChangeSelect}
                                    value={editCategory.parentCategoryName}
                                >
                                    <option value={""}></option>
                                    {categories != null &&
                                        categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <label htmlFor="categoryName">Name:</label>
                            <input
                                type="text"
                                id="categoryName"
                                name="name"
                                value={editCategory.name}
                                onChange={handleChange}
                                className="border rounded px-2 py-1 mb-2"
                            />
                            <div className="flex gap-4 w-full">
                                <div className="">
                                    <label htmlFor="">Top</label>
                                    <select className="border p-2 w-full" id="top" name="top" value={editCategory.top} onChange={handleChange}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="">Deleted</label>
                                    <select className="border p-2 w-full" id="deleted" name="deleted" value={editCategory.deleted} onChange={handleChange}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>

                            <div className="">
                                <div className="">
                                    <p>Quantity of variation</p>
                                    {editCategory.variations.length}
                                </div>
                                <div className="">
                                    <p>Quantity of product</p>
                                    {editCategory.products.length}
                                </div>
                            </div>

                            <button onClick={handleSave} type="button" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
