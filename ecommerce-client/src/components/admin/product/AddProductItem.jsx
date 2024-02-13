import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { requestAddAllVariation, requestAddProduct, requestAddProductItem, requestAddVariation, requestAddVariationOption, requestEditProduct, requestGetCategories, requestGetCategoriesByName, requestGetConfigAdmin, requestUploadImage } from '../../../client/apiRequest';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddProductItem = ({ product, hiddenAddItem, onSuccessAddItem }) => {
    const userInfo = useSelector(state => state?.auth?.login?.userInfo);
    const navigate = useNavigate()
    const [imageFile, setImageFile] = useState(null);
    const [category, setCategory] = useState([]);
    const [selectedVariationOptions, setSelectedVariationOptions] = useState([]);
    const [newValue, setNewValue] = useState("")
    useEffect(() => {
        if (product?.productCategoryName != null) {
            getCategory();
        } else {
            hiddenAddItem()
        }
    }, []);

    const onChangeOptions = (e) => {
        const { name, value } = e.target;
        const temp = [...selectedVariationOptions];
        const index = temp.findIndex(option => option.name === name);
        if (index !== -1) {
            temp[index].value = value;
            temp[index].id = category.variations.find(variation => variation.name === name)?.variationOptions?.find(variationOption => variationOption.value === value)?.id;
        } else {
            const id = category.variations.find(variation => variation.name === name)?.variationOptions?.find(variationOption => variationOption.value === value)?.id;
            temp.push({ name, value, id });
        }
        console.log(temp)
        setSelectedVariationOptions(temp);
    }

    const getCategory = async () => {
        const res = await requestGetCategoriesByName(userInfo?.token, product.productCategoryName);
        if (res?.status == "ok") {
            setCategory(res?.data);
        } else {
            setCategory([]);
        }
    };

    const [editProduct, setEditProduct] = useState(product ?? {
        "name": "",
        "description": "",
        "imageUrl": null,
        "rank": "",
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (userInfo == null) {
            navigate("/");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const onInputNewValue = (e) => {
        setNewValue(e.target.value)
    }

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

    const handleAdd = async (e, id, variationId) => {
        e.preventDefault()
        const request = {
            variationId,
            value: document.getElementById(`categoryName-${id}`).value
        }
        const res = await requestAddVariationOption(userInfo?.token, request)
        if(res?.status == "ok"){
            var temp = category
            toast.success(res?.data)
        }else {
            toast.error(res?.message)

        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if(editProduct.quantity == "" || editProduct.quantity == undefined || product.id == null || selectedVariationOptions.length == 0){
            toast.error("Please fill all fields")
            return
        }
        if (userInfo != null) {
            const imageUrl = await storageImage();
            const request = {
                "quantity": editProduct.quantity,
                "imageUrl": imageUrl != null ? imageUrl : editProduct.imageUrl,
                "idProduct": product.id,
                "idVariationOptions": selectedVariationOptions.map(option => option.id) // Sending the selected variation option IDs to the backend
            };
            let res = null;
            if (product != null) {
                res = await requestAddProductItem(userInfo.token, request);
            } else {
                toast.error("Product not found")
            }
            if (res?.status !== "ok") {
                toast.error(res?.message);
                return;
            }
            toast.success(res?.data);
            onSuccessAddItem();
            hiddenAddItem();
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
                    <IoIosClose className='text-2xl hover:opacity-45 cursor-pointer' onClick={() => hiddenAddItem()} />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h3>

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
                                <div className='flex gap-2 flex-col'>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="quantity"
                                        name="quantity"
                                        value={editProduct.quantity}
                                        onChange={handleChange}
                                        className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <table>
                                    <thead>
                                        <th>Variation</th>
                                        <th>Value</th>
                                    </thead>
                                    <tbody>
                                        {category.length !== 0 && category?.variations?.map(variation => (
                                            <tr key={variation.name}>
                                                <td>{variation.name}</td>
                                                <td>
                                                    <div className="flex px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                                        <input
                                                            type="text"
                                                            list={`variationOptions-${variation.id}`}
                                                            name={variation.name} // Use the variation name as the input name
                                                            id={`categoryName-${variation.id}`}
                                                            className='outline-none w-4/5'
                                                            onInput={onInputNewValue}
                                                            onChange={onChangeOptions} // Use onChangeOptions function to update selected variation options
                                                        />
                                                        <button onClick={e => handleAdd(e, variation.id, variation.id)} className='bg-green-500 px-2 py-1 text-white rounded-lg'>Add</button>
                                                    </div>

                                                    <datalist id={`variationOptions-${variation.id}`}>
                                                        {variation?.variationOptions?.map(variationOption => (
                                                            <option key={variationOption.id} value={variationOption.value}>
                                                                {variationOption.value}
                                                            </option>
                                                        ))}
                                                    </datalist>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

export default AddProductItem;
