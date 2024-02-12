import React, { useEffect, useState } from 'react'
import CategoryManagement from './TableCategory'
import { requestAddCategory, requestGetParentCategories, requestUploadImage } from '../../../client/apiRequest'
import { toast } from 'react-toastify'
import axios from '../../../client/axios'

const CreateCategory = ({ getCategoriesList }) => {
    const [categories, setCategories] = useState(null)
    const [newCategory, setNewCategory] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [selectedParentCategory, setSelectedParentCategory] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageBackend, setImageBackend] = useState(null)

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        const res = await requestGetParentCategories()
        if (res.status == 'ok') {
            setCategories(res.data)
        }
    }

    const onChangeNewCategory = (e) => {
        setNewCategory(e.target.value)
    }
    const onChangeVisible = (event) => {
        setIsVisible(event.target.value === 'true');
    };
    const onChangeSelect = (e) => {
        setSelectedParentCategory(e.target.value);
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
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const imageUrl = await storageImage();
        const request = {
            "name": newCategory,
            "parentName": selectedParentCategory,
            "top": isVisible,
            "imageUrl": imageUrl,
        }

        const res = await requestAddCategory(null, request);
        if(res.status != "ok"){
            toast.error(res.message)
            return
        }
        toast.success(res.data)
        getCategoriesList()
        getCategories()

    }
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);

            // Send the image file to the backend
            const formData = new FormData();
            formData.append('file', file);
            setImageFile(formData)

        }
    };

    return (

        <div className="flex">
            <div>
                <form onSubmit={handleSubmit} action="" className='flex flex-col items-start gap-2 p-4'>
                    <div className="flex gap-2 items-center w-full">
                        <label for="parentCategoryName">Parent name:</label>
                        <select
                            name="parentCategoryName"
                            id="parentCategoryName"
                            className='outline-none border px-2 py-1'
                            onChange={onChangeSelect}
                            value={selectedParentCategory}
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
                    <div className="flex flex-col">
                        <label htmlFor="">Name category</label>
                        <input value={newCategory} onChange={onChangeNewCategory} className='outline-none border px-2 py-1' type="text" />
                    </div>

                    <div className='flex gap-2 items-center'>
                        Top:
                        <div className="items-center flex gap-1">
                            <input
                                onChange={onChangeVisible}
                                type="radio"
                                id='top'
                                name='top'
                                value={true}
                                checked={isVisible}
                            />
                            <label htmlFor="top">Visible</label>
                        </div>

                        <div className="items-center flex gap-1">
                            <input
                                onChange={onChangeVisible}
                                type="radio"
                                id='notop'
                                name='top'
                                value={false}
                                checked={!isVisible}
                            />
                            <label htmlFor="notop">Hidden</label>
                        </div>
                    </div>
                    <div>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {imageUrl && <img src={imageUrl} className='h-32 w-32 bg-contain' alt="Selected" />}
                    </div>
                    <button className='bg-green-700 px-6 py-1 text-gray-100 hover:bg-green-500' type='submit'>
                        Add
                    </button>
                </form>
            </div>

        </div>
    )
}

export default CreateCategory