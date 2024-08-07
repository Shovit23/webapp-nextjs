import React from 'react';

import dynamic from 'next/dynamic';
import SideNavbar from '../../../../components/SideNavbar';
import { Label } from '@headlessui/react';

const DynamicForm = dynamic(() => import('../../../../components/Dynamicform'), { ssr: false });

const confluencetestdatacreation = () => {
  const fields = [
    {
      name: 'environment',
      type: 'select',
      label: 'Please select an Environment:',
      required: true,
      options: [
        { value: '', label: 'Select an option' },
        { value: 'dev', label: 'Dev confluence' },
        { value: 'qa', label: 'QA confluence' },
        { value: 'pre', label: 'PreProd confluence' },
        { value: 'preprod', label: 'Prod confluence' }
      ]
    },
    
    {
      name: 'Projectname',
      type: 'Text',
      label: 'Project Name:',
      required: true,
    },
    {
      name: 'Projectkey',
      type: 'Text',
      label: 'Project Key:',
      required: true,
    },
    {
      name: 'token',
      type: 'password',
      label: 'Token:',
      required: true,
    },  

  ];

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavbar />
      </div>
      <div className="w-3/4 p-8">
        <h1 className="flex justify-center text-xl font-semibold mb-4">Test Data Creation</h1>
        <DynamicForm fields={fields} />
      </div>
    </div>
  );
}

export default confluencetestdatacreation;