import React, { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { requestAddAllVariationOption, requestDeleteAllVarOptionsByVar } from '../../../../client/apiRequest';
import { toast } from 'react-toastify';

const EditVariationOptions = ({ variationOptions, variationName, hiddenEdit, reLoad }) => {
    const varOptionsCore = variationOptions
    const [options, setOptions] = useState(variationOptions.map(variationOption => variationOption.value));
    const handleChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);

    };

    const handleRemove = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleAdd = () => {
        setOptions([...options, '']);
    };

    const handleSave = async () => {
        if (options.includes("")) {
            toast.error("This request contains an empty value");
            return;
        }

        const set = new Set(options);
        if (set.size < options.length) {
            toast.error("This request contains duplicate values");
            return;
        }

        const res = await requestDeleteAllVarOptionsByVar(null, variationName);

        if (res?.status === "ok") {
            const request = { values: options, variationName };
            const res = await requestAddAllVariationOption(null, request);
            if (res?.status === "ok") {
                toast.success("Edit variation options successfully");
            } else {
                const request = { values: varOptionsCore.map(opt => opt.value), variationName };
                const res = await requestAddAllVariationOption(null, request);
                toast.error("An error occurred when editing");
                toast.error(res.message);
            }
        } else {
            toast.error(res.message);
        }
        reLoad();
        hiddenEdit();
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded w-1/3">
                <div className="flex justify-end" onClick={hiddenEdit}>
                    <IoIosClose className='text-2xl hover:opacity-45 cursor-pointer' />
                </div>

                <h3 className="text-lg font-semibold mb-4">Variation Options Of {variationName}</h3>
                <div className="max-h-[200px] overflow-y-auto">
                    {options?.map((option, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-200 p-2 mb-2 rounded">
                            <input
                                type="text"
                                value={option}
                                onChange={(event) => handleChange(index, event)}
                                placeholder="Enter option"
                                className="border rounded px-2 py-1"
                            />
                            <button onClick={() => handleRemove(index)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">Add Option</button>
                    <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditVariationOptions;
