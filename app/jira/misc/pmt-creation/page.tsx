import React from 'react';

import dynamic from 'next/dynamic';
import SideNavbar from '../../../../components/SideNavbar';
import { Label } from '@headlessui/react';

const DynamicForm = dynamic(() => import('../../../../components/Dynamicform'), { ssr: false });

const pmt = () => {
  const fields = [
    
    {
      name: 'Projectname',
      type: 'Text',
      label: 'Project Name:',
      required: true,
    },
    {
      name: 'count',
      type: 'number',
      label: 'Project Count:',
      required: true,
    },
    {
      name: 'Username',
      type: 'email',
      label: 'username:',
      required: true,
    },
    {
      name: 'ucp',
      type: 'Text',
      label: 'user count per project:',
      required: true,
    },

  ];

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavbar />
      </div>
      <div className="w-3/4 p-8">
        <h1 className="flex justify-center text-xl font-semibold mb-4">PMT Creation</h1>
        <DynamicForm fields={fields} />
      </div>
    </div>
  );
}

export default pmt;