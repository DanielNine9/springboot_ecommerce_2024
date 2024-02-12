import React, { useEffect, useState } from 'react';
import { fetchImages } from '../../../utils/fetchImage';
import EditCategory from './EditCategory';
import { API_BASE_URL } from '../../constants';

const TableCategory = ({ categories, getCategoriesList }) => {
    const [imageUrls, setImageUrls] = useState({});
    const [filterText, setFilterText] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    
    const hiddenEdit = () => {
        setEditCategory(null)
    }

  


    // useEffect(() => {
    //     fetchImages(categories, setImageUrls);
    // }, [categories]);

    const filteredCategories = categories?.filter(category =>
        category.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="p-4 w-full ">
            <input
                type="text"
                placeholder="Filter by category name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <div className='overflow-y-auto max-h-[500px]'>

                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Category name</th>
                            <th className="border p-2">Category parent name</th>
                            <th className="border p-2">Top</th>
                            <th className="border p-2">Deleted</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories?.map(category => (
                            <tr key={category.name} className="hover:bg-gray-100">
                                <td className="border text-center p-2">{category.name}</td>
                                <td className="border text-center p-2">
                                    <img className='w-24 h-12' src={category != null && category.imageUrl} alt="" />
                                </td>
                                <td className="border text-center p-2">{category.name}</td>
                                <td className="border text-center p-2">{category.parentCategoryName}</td>
                                <td className="border text-center p-2">{category.top ? "True" : "False"}</td>
                                <td className="border text-center p-2">{category.deleted ? "True" : "False"}</td>
                                <td className="border text-center p-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1" onClick={() => setEditCategory(category)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editCategory != null && <EditCategory category={editCategory} hiddenEdit={hiddenEdit} getCategoriesList={getCategoriesList}/>}
        </div>

    );
};

export default TableCategory;
