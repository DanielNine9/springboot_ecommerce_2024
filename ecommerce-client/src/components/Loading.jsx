import React from 'react'


const Loading = (props) => {
    return (<>
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 ">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
    </>)
}

export default Loading