import React from 'react';

const DialogYesNo = ({ message, onYes, onNo }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
            onClick={onYes}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onNo}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogYesNo;
