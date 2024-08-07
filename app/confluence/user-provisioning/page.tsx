import React from 'react';
import SideNavbar from '../../../components/SideNavbar';
import dynamic from 'next/dynamic';

const DynamicForm = dynamic(() => import('../../../components/Dynamicform'), { ssr: false });

const confluenceUserprovisioning = () => {
  const fields = [
    {
      name: '',
      type: 'select',
      label: 'Account type:',
      required: true,
      options: [
        { value: '', label: 'Select an option' },
        { value: 'internal', label: 'Deloitte' },
        { value: 'Externa', label: 'Client' },
        
      ]
    },
    {
      name: 'environment',
      type: 'select',
      label: 'Please select an Environment:',
      required: true,
      options: [
        { value: '', label: 'Select an option' },
        { value: 'dev', label: 'Dev Jira' },
        { value: 'qa', label: 'QA Jira' },
        { value: 'pre', label: 'PreProd Jira' },
        { value: 'preprod', label: 'Prod Jira' }
      ]
    },
    {
      name: 'UserId',
      type: 'email',
      label: 'User Id:',
      required: true,
    },
    {
      name: 'Roles',
      type: 'select',
      label: 'Please select Roles:',
      required: true,
      options: [
        { value: '', label: 'Select option' },
        { value: 'admin', label: 'Jira Admin' },
        { value: 'qa', label: 'Project Admin' },
        { value: 'pre', label: 'Team Member' },
        
      ]
    },

  ];

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavbar />
      </div>
      <div className="w-3/4 p-8">
        <h1 className="flex justify-center text-xl font-semibold mb-4">User Provisioning</h1>
        <DynamicForm fields={fields} />
      </div>
    </div>
  );
}

export default confluenceUserprovisioning;