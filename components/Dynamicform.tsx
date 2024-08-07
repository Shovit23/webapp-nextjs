
// import React from 'react';

// const DynamicForm = ({ fields }) => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());
//     console.log('Form Data:', data);
//   };

//   return (
    
//     <div className="flex justify-center m-0">
//       <form  className="space-y-8 w-full max-w-lg p-5 bg-white rounded-lg shadow-lg">
//         {fields.map((field, index) => (
//           <div key={index} className="flex flex-col">
//             <label htmlFor={field.name} className="mb-2 text-sm font-medium text-gray-900">{field.label}</label>
//             {field.type === 'select' ? (
//               <select
//                 name={field.name}
//                 className="p-2 border border-gray-300 rounded-md"
//                 required={field.required}>
//                 {field.options.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type={field.type}
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 className="p-2 border border-gray-300 rounded-md"
//                 required={field.required}
//               />
//             )}
//           </div>
//         ))}
//         <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default DynamicForm;


import React from 'react';
import UploadButton from './UploadButton';
const DynamicForm = ({ fields }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Data:', data);
  };

  return (
    <div className="flex justify-center m-0">
      <form className="space-y-8 w-full max-w-lg p-5 bg-white rounded-lg shadow-lg" >
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label htmlFor={field.name} className="mb-2 text-sm font-medium text-gray-900">{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                className="p-2 border border-gray-300 rounded-md"
                required={field.required}
              >
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'file' ? (
              <UploadButton
                name={field.name}
                required={field.required}
                
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="p-2 border border-gray-300 rounded-md"
                required={field.required}
              />
            )}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;