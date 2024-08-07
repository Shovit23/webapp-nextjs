

// 'use client';

// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import SideNavbar from './SideNavbar';
// import Loading from './Loading';
// import '/css/template.css'
// import '/css/form.css'; 

// const JiraForm = () => {
//   const [formData, setFormData] = useState({
//     url: '',
//     projectkey: '',
//     token: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const load = Loading('Downloading attachments');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const Data = {
//     jira_url: formData.url,
//     bearer_token: formData.token,
//     project: formData.projectkey,
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.url || !formData.projectkey || !formData.token) {
//       toast.error('Please fill all the fields', { position: 'bottom-right' });
//     } else {
//       setIsLoading(true);
//       try {
//         const response = await fetch('http://localhost:5000/download_attachments', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(Data),
//         });
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         console.log('API response:', data);
//         toast.success('Attachment downloaded', { position: 'bottom-right' });
//       } catch (error) {
//         console.error('Error:', error);
//         toast.error('Failed to connect', { position: 'bottom-right' });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="screen">
//       <SideNavbar />
//       <div className="initiate">
//         {isLoading ? (
//           load
//         ) : (
//           <form className="form-container" onSubmit={handleSubmit}>
//             <h2 className="form-heading">Please fill the required details</h2>
//             <div className="form-section">
//               <label htmlFor="url" className="form-label">
//                 Please select an Environment:
//               </label>
//               <select
//                 name="url"
//                 id="url"
//                 className="select-field"
//                 value={formData.url}
//                 onChange={handleChange}
//               >
//                 <option defaultValue="none">Select the option</option>
//                 <option value="https://dev-jira.deloitte.com">Dev Jira</option>
//                 <option value="https://qa-jira.deloitte.com">QA Jira</option>
//                 <option value="http://preprod-jira.deloitte.com">Preprod Jira</option>
//                 <option value="https://jira.deloitte.com">Prod Jira</option>
//               </select>
//             </div>
//             <div className="form-section">
//               <label htmlFor="token" className="form-label">Token:</label>
//               <input
//                 type="password"
//                 id="token"
//                 name="token"
//                 className="input-field"
//                 value={formData.token}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-section">
//               <label htmlFor="projectkey" className="form-label">Project Key:</label>
//               <input
//                 type="text"
//                 id="projectkey"
//                 name="projectkey"
//                 className="input-field"
//                 value={formData.projectkey}
//                 onChange={handleChange}
//               />
//             </div>
//             <button type="submit" className="button">
//               Submit
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JiraForm;


