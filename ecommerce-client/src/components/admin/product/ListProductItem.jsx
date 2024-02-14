import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { requestGetCategories, requestGetProductItemByProductId, requestGetProductsByCategory } from '../../../client/apiRequest';
import AddProductItem from './AddProductItem';

const ListProductItem = () => {
    const userInfo = useSelector(state => state?.auth?.login?.userInfo);
    const [products, setProducts] = useState(null)
    const [productItems, setProductItems] = useState(null)
    const [selectedParentCategory, setSelectedParentCategory] = useState("Phone");
    const [categories, setCategories] = useState(null);
    const [edit, setEdit] = useState(false)
    const [addProductItem, setAddProductItem] = useState(null)
    const [editProductItem, setEditProductItem] = useState(null)
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    const getCategories = async () => {
        const res = await requestGetCategories(userInfo?.token);
        if (res.status === "ok") {
            setCategories(res.data);
        }
    };

    useEffect(() => {
        if (userInfo == null) {
            navigate("/")
            return
        }
        getCategories();

    }, []);

    useEffect(() => {
        getProducts()
        setProductItems()
    }, [selectedParentCategory])

    const getProducts = async () => {
        if (selectedParentCategory != "") {
            const res = await requestGetProductsByCategory(userInfo?.token, selectedParentCategory)
            if (res?.status == "ok") {
                setProducts(res.data)
            }
        }
    }

    const hiddenEdit = () => {
        setEdit(false)
    }

    const onChangeSelect = (e) => {
        setSelectedParentCategory(e.target.value);
    };

    const deleteVariation = async (name) => {
        // const res = await requestDeleteVariation(null, name)
        // if (res?.status == "ok") {
        //     getVariation()
        // } else {
        //     toast.error("Has an error occured when deleted this variation with name " + name)
        // }
    }


    const handleEdit = async (product) => {
        setEditProductItem(product)

    }

    const handleClickProduct = async (product) => {
        setProduct(product)
        const res = await requestGetProductItemByProductId(userInfo?.token, product.id)
        if (res?.status == "ok") {
            setProductItems(res?.data)
        } else {
            setProductItems(null)
        }
    }


    return (
        <div className='p-4'>
            <div className="flex gap-2 items-center w-full mb-2">
                <label for="parentCategoryName">Parent name:</label>
                <select
                    name="parentCategoryName"
                    id="parentCategoryName"
                    className='outline-none border px-2 py-1'
                    onChange={onChangeSelect}
                    value={selectedParentCategory}
                >
                    {categories != null &&
                        categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="flex gap-4" >
                <div className="overflow-y-auto h-full w-1/3">

                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Quantity of items</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products != null ?
                                products?.map(product => (
                                    <tr onClick={() => handleClickProduct(product)} key={product.name} className="hover:bg-gray-100">
                                        <td className="border text-center p-2">{product.name}</td>
                                        <td className="border text-center p-2 flex justify-center items-center">
                                            <img className='w-32 h-24 bg-contain' src={product.imageUrl} alt={product.name} />
                                        </td>
                                        <td className="border text-center p-2">{product?.productItems?.length}</td>
                                        <td className="border text-center p-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => setAddProductItem(product)}>Add</button>
                                        </td>
                                    </tr>
                                ))
                                :
                                ""}
                        </tbody>
                    </table>
                </div>
                <div className="overflow-y-auto h-screen w-2/3">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Id</th>
                                <th className="border p-2">Quantity</th>
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Quantity of variation options</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productItems != null ?
                                productItems?.map(product => (
                                    <tr key={product.name} className="hover:bg-gray-100">
                                        <td className="border text-center p-2">{product.id}</td>
                                        <td className="border text-center p-2">{product.quantity}</td>
                                        <td className="border text-center p-2 flex justify-center items-center">
                                            <img className='w-32 h-24 bg-contain' src={product.imageUrl} alt={product.name} />
                                        </td>
                                        <td className="border text-center p-2">{product?.variationOptions?.length}</td>
                                        <td className="border text-center p-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => handleEdit(product)}>Edit</button>
                                            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => deleteVariation()}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                                :
                                ""}
                        </tbody>
                    </table>
                </div>
            </div>

            {
                addProductItem != null && <AddProductItem product={addProductItem} hiddenAddItem={() => { setAddProductItem(null) }} onSuccessAddItem={() => handleClickProduct(addProductItem)} />
            }

            {
                editProductItem != null && <AddProductItem product={product} hiddenAddItem={() => { setEditProductItem(null) }} onSuccessAddItem={() => handleClickProduct(product)} productItem={editProductItem} />
            }

        </div>
    )
}

export default ListProductItem