import React from 'react';
import SideNavbar from '../../../components/SideNavbar';
import dynamic from 'next/dynamic';

const DynamicForm = dynamic(() => import('../../../components/Dynamicform'), { ssr: false });

const confluencemonthlyMetrics = () => {
  const fields = [
    {
      name: 'environment',
      type: 'select',
      label: 'Please select an Environment:',
      required: true,
      options: [
        { value: '', label: 'Select an option' },
        { value: 'dev', label: 'Dev Confluence' },
        { value: 'qa', label: 'QA Confluence' },
        { value: 'pre', label: 'PreProd Confluence' },
        { value: 'preprod', label: 'Prod Confluence' }
      ]
    },
    {
      name: 'projecttype',
      type: 'select',
      label: 'Please select Project Type:',
      required: true,
      options: [
        { value: '', label: 'Select an option' },
        { value: 'raw', label: 'Raw Project' },
        { value: 'Active', label: 'Active Project' },
        { value: 'AppIn', label: 'App Integrated Project' }
      ]
    },
    {
      name: 'UserId',
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

  ];

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavbar />
      </div>
      <div className=" w-3/4 p-8">
        <h1 className="flex justify-center text-xl font-semibold pt-5">Monthly Metrics</h1>
        <DynamicForm fields={fields} />
      </div>
    </div>
  );
}

export default confluencemonthlyMetrics;