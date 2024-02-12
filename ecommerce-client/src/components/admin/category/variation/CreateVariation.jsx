import React, { useEffect, useState } from 'react';
import { requestAddAllVariation, requestAddAllVariationOption, requestGetCategories } from '../../../../client/apiRequest';
import { toast } from 'react-toastify';

const CreateVariation = () => {
    const [selectedParentCategory, setSelectedParentCategory] = useState("Phone");
    const [categories, setCategories] = useState(null);
    const [optionIndex, setOptionIndex] = useState(1);
    const [variations, setVariations] = useState([{ name: '', values: [''] }]);

    const getCategories = async () => {
        const res = await requestGetCategories(null);
        if (res.status === "ok") {
            setCategories(res.data);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const onChangeSelect = (e) => {
        setSelectedParentCategory(e.target.value);
    };

    const addVariation = () => {
        setOptionIndex(optionIndex + 1);
        setVariations([...variations, { name: '', values: [''] }]);
    };

    const handleVariationChange = (index, key, valueIndex, newValue) => {
        const updatedVariations = [...variations];
        if (key === 'name') {
            updatedVariations[index][key] = newValue;
        } else if (key === 'value') {
            updatedVariations[index].values[valueIndex] = newValue;
        }
        setVariations(updatedVariations);
    };

    const addValue = (index) => {
        const updatedVariations = [...variations];
        updatedVariations[index].values.push('');
        setVariations(updatedVariations);
    };

    const removeValue = (variationIndex, valueIndex) => {
        const updatedVariations = [...variations];
        updatedVariations[variationIndex].values.splice(valueIndex, 1);
        setVariations(updatedVariations);
    };

    const removeVariation = (index) => {
        const updatedVariations = [...variations];
        updatedVariations.splice(index, 1);
        setVariations(updatedVariations);
    };

    const handleSave = async () => {
        try {
            // Construct the request object for variations
            const requestVariation = {
                categoryName: selectedParentCategory,
                names: variations.map(variation => variation.name)
            };
            console.log(requestVariation);
    
            // Send request to add all variations
            const res = await requestAddAllVariation(null, requestVariation);
            
            // Check if the request was successful
            if (res.status !== "ok") {
                throw new Error("An error occurred when adding variations");
            }
    
            // Construct individual requests for each variation
            const requestData = variations.map(variation => ({
                variationName: variation.name,
                values: variation.values
            }));
    
            // Send individual requests for each variation
            const promises = requestData.map(async (request) => {
                const res = await requestAddAllVariationOption(null, request);
                if (res.status !== "ok") {
                    toast.error(`An error occurred when adding variation ${request.variationName}`);
                    return
                }
            });
    
            // Wait for all individual requests to complete
            await Promise.all(promises);
            // Display success message
            toast.success("Variations added successfully");
        } catch (error) {
            // Display error message if any error occurs during the process
            toast.error(error.message);
        }
    }
    return (
        <div className='p-4'>
            <h2 className="text-lg font-semibold mb-4">Add Variation</h2>
            <div className="flex gap-2 items-center mb-4">
                <label htmlFor="parentCategoryName" className="mr-2">Category name:</label>
                <select
                    name="parentCategoryName"
                    id="parentCategoryName"
                    className='border px-2 py-1 rounded'
                    onChange={onChangeSelect}
                    value={selectedParentCategory}
                >
                    {categories !== null &&
                        categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>
            {variations.map((variation, variationIndex) => (
                <div key={variationIndex} className='flex gap-2'>
                    <div className="">
                        <p>Name variation</p>
                        <input
                            type='text'
                            placeholder='Name'
                            value={variation.name}
                            className='border px-2 py-1 rounded'
                            onChange={(e) => handleVariationChange(variationIndex, 'name', 0, e.target.value)}
                        />
                    </div>

                    <div>
                        <p>Value variation</p>
                        <div className="flex gap-2 flex-wrap">
                            {variation.values.map((value, valueIndex) => (
                                <div key={valueIndex} className='flex gap-2 items-center border px-2 py-1 rounded'>
                                    <input
                                        type='text'
                                        placeholder='Value'
                                        value={value}
                                        className='outline-none'
                                        onChange={(e) => handleVariationChange(variationIndex, 'value', valueIndex, e.target.value)}
                                    />
                                    <button className="text-gray-400" onClick={() => removeValue(variationIndex, valueIndex)}>X</button>
                                </div>
                            ))}
                            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => addValue(variationIndex)}>Add Value</button>
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={() => removeVariation(variationIndex)}>Remove Variation</button>
                    </div>
                </div>
            ))}
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={addVariation}>Add Variation</button>
                <button className="bg-blue-500 text-white px-6 py-2 rounded mt-4" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default CreateVariation;
