import React from 'react'

const UploadButton = ({ name, required = false }) => {
    return (
        <div className=''>
      <input
        type="file"
        name={name}
        className="flex justify-center items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 cursor-pointer"
        required={required}
        
      />
      </div>
    );
  };
  

export default UploadButton;