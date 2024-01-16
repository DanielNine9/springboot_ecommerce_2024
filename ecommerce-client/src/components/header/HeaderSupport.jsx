import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderSupport = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between container max-w-[1200px] mx-auto">
                <div onClick={() => navigate("/") }>Shop</div>
                <div>Hahaha</div>
            </div>
        </div>
    )
}

export default HeaderSupport