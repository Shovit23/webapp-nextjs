import Link from 'next/link'
import React from 'react'

const DevopSidebar = () => {
  return (
    <div>

        <h1>devops side bar</h1>
        <aside className=" left-0 h-screen w-64 bg-gray-500 text-white overflow-y-auto z-40">
      <button>
      < div className="flex items-center pt-20 px-4 ">
        <span className="text-xl font-bold">Placeholder</span>
      </div>
      </button>
      <ul className="mt-2">
        <li><a href="#" className="flex items-center py-2 hover:bg-gray-800">
          {/* <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L9.5 5.5 17 12v3h2v-3l7.5-7.5L16 2L8 4zM3 16v-2l11-11h6v6l11 11v2H3z" fill="currentColor" />
          </svg> */}
          ⮕ Logging
        </a></li>

        <li><a href="#" className="flex items-center py-2 hover:bg-gray-700">
          {/* <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L9.5 5.5 17 12v3h2v-3l7.5-7.5L16 2L8 4zM3 16v-2l11-11h6v6l11 11v2H3z" fill="currentColor" />
          </svg> */}
          ⮕ Monitoring
        </a></li>

        <li><a href="#" className="flex items-center py-2 hover:bg-gray-700">
          {/* <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L9.5 5.5 17 12v3h2v-3l7.5-7.5L16 2L8 4zM3 16v-2l11-11h6v6l11 11v2H3z" fill="currentColor" />
          </svg> */}
          ⮕ Toolkit
        </a></li>
       
      </ul>
    </aside>
        
    </div>
  )
}

export default DevopSidebar