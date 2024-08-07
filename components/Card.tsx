import React from 'react';

const Card = ({ heading }) => {
  return (
    <button className="w-96 min-h-[150px] m-1"> {/* Adjusted minimum height */}
   

      <div className="flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-lg bg-white hover:bg-del-green transition-colors m-4 py-4"> {/* Increased padding */}
    <br /><br />
        <h1 className="text-base font-medium text-center mb-1">{heading}</h1>
        <br /><br />
      </div>
    </button>
  );
};

export default Card;