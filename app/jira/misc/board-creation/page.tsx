import React from 'react';

import dynamic from 'next/dynamic';
import SideNavbar from '../../../../components/SideNavbar';
import { Label } from '@headlessui/react';

const DynamicForm = dynamic(() => import('../../../../components/Dynamicform'), { ssr: false });

const board = () => {
  const fields = [
    {
      name: 'board',
      type: 'select',
      label: 'Please select an board:',
      required: true,
      options: [
        { value: '', label: 'Select an option' },
        { value: 'story', label: 'story board' },
        { value: 'task', label: 'Task Board by agile team' },
        { value: 'refinement', label: 'Refinement Board' },
        { value: 'Enabler', label: 'Enabler Kanban Board by agile team' },
        { value: 'enabler task' , label:"Enabler Task Board by AgileTeam"}
      ]
    },
    {
      name: 'Projectname',
      type: 'Text',
      label: 'Project Name:',
      required: true,
    },
    {
      name: 'Jql',
      type: 'Text',
      label: 'JQL:',
      required: true,
    },
    {
      name: 'token',
      type: 'password',
      label: 'Token:',
      required: true,
    },
    {
      name: 'Projectkey',
      type: 'Text',
      label: 'Project Key:',
      required: true,
    },

  ];

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavbar />
      </div>
      <div className="w-3/4 p-8">
        <h1 className="flex justify-center text-xl font-semibold mb-4">Board Creation</h1>
        <DynamicForm fields={fields} />
      </div>
    </div>
  );
}

export default board;