import React, { useEffect, useState } from 'react'
import TableCategory from './TableCategory'
import CreateCategory from './CreateCategory'
import { requestGetCategories } from '../../../client/apiRequest'

const CategoryManagement = () => {
    const [categories, setCategories] = useState(null)
    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = async () => {
        const res = await requestGetCategories(null);
        if (res.status == "ok") {
            setCategories(res.data)
        }
    }

    return (
        <div>
            <div className='p-6'>
                <h2 className='text-xl'>
                    Category management
                </h2>
                <div className="flex">
                    <CreateCategory getCategoriesList={getCategories}/>
                    <TableCategory categories={categories} getCategoriesList={getCategories}/>
                </div>

            </div>
        </div>
    )
}

export default CategoryManagement