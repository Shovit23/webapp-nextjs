import React from 'react';

import dynamic from 'next/dynamic';
import SideNavbar from '../../../../components/SideNavbar';
import { Label } from '@headlessui/react';

const DynamicForm = dynamic(() => import('../../../../components/Dynamicform'), { ssr: false });

const Sonarqubeapitesting = () => {
  const fields = [  

      {
        name: 'method',
        type: 'select',
        label: 'Please select an Method:',
        required: true,
        options: [
          { value: '', label: 'Select an option' },
          { value: 'get', label: 'GET' },
          { value: 'post', label: 'POST' },
          { value: 'put', label: 'PUT' },
          { value: 'patch', label: 'PATCH' },
          { value: 'delete', label: 'DELETE' }
        ]
      },
    {
      name: 'Username',
      type: 'email',
      label: 'Username:',
      required: true,
    },
    {
      name: 'token',
      type: 'password',
      label: 'Token:',
      required: true,
    },
    
    {
      name: 'apiurl',
      type: 'Text',
      label: 'URL:',
      required: true,
    },

  ];

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavbar />
      </div>
      <div className="w-3/4 p-8">
        <h1 className="flex justify-center text-xl font-semibold mb-4">API Testing</h1>
        <DynamicForm fields={fields} />
      </div>
    </div>
  );
}

export default Sonarqubeapitesting;