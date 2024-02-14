import React, { useEffect, useState } from 'react'
import { requestGetProducts, requestRemoveProductWithId } from '../../../client/apiRequest'
import DialogYesNo from '../../common/DialogYesNo'
import { toast } from 'react-toastify'
import EditProduct from './EditProduct'
import { AiFillPlusCircle } from "react-icons/ai"
import AddProductItem from './AddProductItem'
const ListProduct = () => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [filterText, setFilterText] = useState("")
    const [products, setProducts] = useState([])
    const [deleted, setDeleted] = useState(null)
    const [add, setAdd] = useState(false)
    const [addItem, setAddItem] = useState(null)
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        const res = await requestGetProducts()
        if (res?.status === "ok") {
            setProducts(res.data)
        }
    }

    const onNo = () => {
        setDeleted(null)
    }

    const onYes = async () => {
        const res = await requestRemoveProductWithId(null, deleted.id)
        if (res?.status == "ok") {
            toast.success(res.data)
            getProducts()
            setDeleted(null)
        } else {
            toast.error(res.message)
        }
    }
    const onSuccess = async () => {
        getProducts()
        setSelectedProduct(null)
    }
  
    return (
        <div>
            <div className="p-4 w-full ">
                <div className="flex justify-between items-center">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Filter by product name"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={() => setAdd(true)} className='flex gap-2 items-center bg-green-700 hover:bg-green-500 px-4 py-1 rounded-sm text-white'>
                            <AiFillPlusCircle /> Add
                        </button>
                    </div>

                </div>

                <div className='overflow-y-auto max-h-[500px]'>
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Id</th>
                                    <th className="border p-2">Product name</th>
                                    <th className="border p-2">Description</th>
                                    <th className="border p-2">Image</th>
                                    <th className="border p-2">Deleted</th>
                                    <th className="border p-2">Category</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map(product => (
                                    <tr  key={product.name} className="hover:bg-gray-100">
                                        <td className="border text-center p-2">{product.id}</td>
                                        <td className="border text-center p-2">{product.name}</td>
                                        <td className="border text-center p-2">{product.description}</td>
                                        <td className="border text-center p-2 flex justify-center items-center">
                                            <img className='w-52 h-44 bg-contain' src={product != null && product.imageUrl} alt={product.name} />
                                        </td>
                                        <td className="border text-center p-2">{product.deleted ? "True" : "False"}</td>
                                        <td className="border text-center p-2">{product.productCategoryName}</td>
                                        <td className="border text-center p-2">
                                            <button className="hover:bg-green-500 bg-green-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => setAddItem(product)}>Add Items</button>
                                            <button className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => setSelectedProduct(product)}>Edit</button>
                                            <button className="hover:bg-red-500 bg-red-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => setDeleted(product)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                </div>
                {/* {selectedProduct != null && <editProduct category={editCategory} hiddenEdit={hiddenEdit} getCategoriesList={getCategoriesList} />} */}

                {deleted != null && <DialogYesNo message={"Are you sure delete product with id " + deleted.id} onYes={onYes} onNo={onNo} />}
                {selectedProduct != null && <EditProduct product={selectedProduct} hiddenEdit={() => setSelectedProduct(null)} onSuccess={onSuccess} />}
                {add && <EditProduct product={null} hiddenEdit={() => setAdd(false)} onSuccess={onSuccess} />}
                {addItem != null && <AddProductItem product={addItem} hiddenAddItem={() => setAddItem(null)} onSuccessAddItem={onSuccess} />}
            </div>
        </div>
    )
}

export default ListProduct