import React from 'react';
import SideNavbar from '../../../components/SideNavbar';
import dynamic from 'next/dynamic';

const DynamicForm = dynamic(() => import('../../../components/Dynamicform'), { ssr: false });

const SonarqubeLicense = () => {
  const fields = [
    {
      name: 'environment',
      type: 'select',
      label: 'Please select an Environment:',
      required: true,
      options: [
        { value: '', label: 'Select an option' },
        { value: 'dev', label: 'Dev Sonarqube' },
        { value: 'qa', label: 'QA Sonarqube' },
        { value: 'pre', label: 'PreProd Sonarqube' },
        { value: 'preprod', label: 'Prod Sonarqube' }
      ]
    },
   
    {
      name: 'UserId',
      type: 'email',
      label: 'User Id:',
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
        <h1 className="flex justify-center text-xl font-semibold mb-4">Licence Reclaimation</h1>
        <DynamicForm fields={fields} />
      </div>
    </div>
  );
}

export default SonarqubeLicense;