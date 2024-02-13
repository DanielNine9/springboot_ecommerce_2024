import React, { useEffect, useState } from 'react'
import { requestDeleteVariation, requestGetCategories, requestGetVariationByCategory, requestGetVariationOptionsByVariation } from '../../../../client/apiRequest';
import { toast } from 'react-toastify';
import EditVariationOptions from './EditVariationOptions';

const ListVariation = () => {
    const [variations, setVariations] = useState(null)
    const [selectedParentCategory, setSelectedParentCategory] = useState("Phone");
    const [categories, setCategories] = useState(null);
    const [edit, setEdit] = useState(false)
    const [variationOptions, setVariationOptions] = useState(null)
    const [variationName, setVariationName] = useState("")
    const [variationId, setVariationId] = useState("")

    const getCategories = async () => {
        const res = await requestGetCategories(null);
        if (res.status === "ok") {
            setCategories(res.data);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getVariation()
        // const res = null;
        // if (res.status == "ok") {
        //     setVariations(res.data)
        // }
    }, [selectedParentCategory])

    const getVariation = async () => {
        if (selectedParentCategory != "") {
            const res = await requestGetVariationByCategory(null, selectedParentCategory)
            if (res?.status == "ok") {
                setVariations(res.data)
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
        const res = await requestDeleteVariation(null, name)
        if (res?.status == "ok") {
            getVariation()
        } else {
            toast.error("Has an error occured when deleted this variation with name " + name)
        }
    }


    const handleEdit = async (variationName, variationId) => {
        const res = await requestGetVariationOptionsByVariation(null, variationName)
        if(res?.status == "ok"){
            setVariationOptions(res.data)
            setVariationName(variationName)
            setVariationId(variationId)
            setEdit(true)
        }
    }

    return (
        <div className='p-4'>
            <h2>List variation</h2>
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
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Category name</th>
                        <th className="border p-2">Quantity of variation</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {variations ?
                        variations?.map(variation => (
                            <tr key={variation.name} className="hover:bg-gray-100">
                                <td className="border text-center p-2">{variation.name}</td>
                                <td className="border text-center p-2">{variation.categoryName}</td>
                                <td className="border text-center p-2">{variation.variationOptions?.length}</td>
                                <td className="border text-center p-2">
                                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => handleEdit(user)}>Edit</button> */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => handleEdit(variation.name, variation.id)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => deleteVariation(variation.name)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        :
                        ""}
                </tbody>
            </table>
            {
                edit && variationId != "" && <EditVariationOptions variationOptions={variationOptions} variationName = {variationName} hiddenEdit={hiddenEdit} reLoad={getVariation}/>
            }

        </div>
    )
}

export default ListVariation