'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faChartLine,
  faProjectDiagram,
  faUser,
  faChevronUp,
  faChevronDown,
  faClipboardList,
  faVial,
  faDatabase,
  faTools
} from '@fortawesome/free-solid-svg-icons';

const SideNavbar = () => {
  const [showJiraSubmenu, setShowJiraSubmenu] = useState(false);
  const [showJiraSaaSSubmenu, setShowJiraSaaSSubmenu] = useState(false);
  const [showConfluenceSubmenu, setShowConfluenceSubmenu] = useState(false);
  const [showConfluenceSaaSSubmenu, setShowConfluenceSaaSSubmenu] = useState(false);
  const [showSonarqubeSubmenu, setSonarqubeSubmenu] = useState(false);
  const [showMiscSubmenu, setShowMiscSubmenu] = useState(false);
  const [showGenAISubmenu, setShowGenAISubmenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleJiraSubmenu = () => {
    setShowJiraSubmenu(!showJiraSubmenu);
    if (showConfluenceSubmenu) {
      setShowConfluenceSubmenu(false);

    }
  };
  const toggleJiraSaaSSubmenu = () => {
    setShowJiraSaaSSubmenu(!showJiraSaaSSubmenu);
    // setSonarqubeSubmenu(!showSonarqubeSubmenu);
    // setShowJiraSubmenu(false);
    // setShowConfluenceSubmenu(false);
    // setShowMiscSubmenu(false)

};


  const toggleConfluenceSubmenu = () => {
    setShowConfluenceSubmenu(!showConfluenceSubmenu);
    if (showJiraSubmenu) {
      setShowJiraSubmenu(true);
    }
  };
  const toggleConfluenceSaaSSubmenu = () => {
    setShowConfluenceSaaSSubmenu(!showConfluenceSaaSSubmenu);
};

const toggleGenAIubmenu = () => {
  setShowGenAISubmenu(!showGenAISubmenu);
};


  const toggleSonarqubeSubmenu = () => {
    setSonarqubeSubmenu(!showSonarqubeSubmenu);
    // setSonarqubeSubmenu(!showSonarqubeSubmenu);
    // setShowJiraSubmenu(false);
    // setShowConfluenceSubmenu(false);
    // setShowMiscSubmenu(false)
  };

  const toggleMiscSubmenu = () => {
    setShowMiscSubmenu(!showMiscSubmenu);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-300 bg-black text-white  shadow-lg ${isCollapsed ? 'w-16' : 'w-64'}`} style={{ height: '100vh' }}>
      <div className="flex items-center justify-between p-4 relative">
        <h1 className={` flex justify-center items-center text-lg from-neutral-400 ${isCollapsed ? 'hidden' : 'block'}`}>SERVICES</h1>
        <div className={`absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full p-1 ${isCollapsed ? '' : ''}`}>
          <button onClick={toggleSidebar} className="focus:outline-none text-black">
            <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} size="xs" className="transition-transform duration-300" />
          </button>
        </div>
      </div>

      <nav className="flex-grow px-4 pb-4 overflow-y-auto mb-12">
        <div className="mt-2">

          {/* jira */}

          <button onClick={toggleJiraSubmenu} className="flex items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faChartLine} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
            {!isCollapsed && 'Jira'} &nbsp;
            <FontAwesomeIcon icon={showJiraSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
          </button>
          {showJiraSubmenu && (
            <div className="mt-2 space-y-1 pl-8">

              <Link href="/jira/monthlyMetrics" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Monthly Metrics'}
              </Link>
              <Link href="/jira/licence-reclaim" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'Licence Reclaimation'}
                </div>
              </Link>
              <Link href="/jira/project-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'Project Provisioning'}
                </div>
              </Link>
              <Link href="/jira/user-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'User Provisioning'}
                </div>
              </Link>
              <button onClick={toggleMiscSubmenu} className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faTools} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Miscellaneous'}
                <FontAwesomeIcon icon={showMiscSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
              </button>
              {showMiscSubmenu && (
                <div className="mt-2 space-y-1 pl-8">
                  <Link href="/jira/misc/attachment" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">

                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faDatabase} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'Jira Extraction'}
                    </div>
                  </Link>
                  <Link href="/jira/misc/board-creation" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faClipboardList} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'Board Creation'}
                    </div>
                  </Link>
                  <Link href="/jira/misc/testdata-creation" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faDatabase} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'Test Data Creation'}
                    </div>
                  </Link>
                  <Link href="/jira/misc/pmt-creation" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faTools} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'PMT Creation'}
                    </div>
                  </Link>
                  <Link href="/jira/misc/api-testing" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faVial} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'API Testing'}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}



          {/*confluence*/}

          <button onClick={toggleConfluenceSubmenu} className="flex items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faChartLine} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
            {!isCollapsed && 'Confluence'} &nbsp;
            <FontAwesomeIcon icon={showConfluenceSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
          </button>
          {showConfluenceSubmenu && (
            <div className="mt-2 space-y-1 pl-8">
              <Link href="/confluence/monthlyMetrics" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Monthly Metrics'}
              </Link>
              <Link href="/confluence/licence-reclaim" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Licence Reclaimation'}
              </Link>
              <Link href="/confluence/project-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Project Provisioning'}
              </Link>
              <Link href="/confluence/user-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'User Provisioning'}
              </Link>
              <button onClick={toggleMiscSubmenu} className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faTools} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Miscellaneous'}
                <FontAwesomeIcon icon={showMiscSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
              </button>
              {showMiscSubmenu && (
                <div className="mt-2 space-y-1 pl-8">
                  <Link href="/confluence/misc/testdata-creation" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon icon={faDatabase} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                    {!isCollapsed && 'Test Data Creation'}
                  </Link>
                  <Link href="/confluence/misc/api-testing" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon icon={faVial} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                    {!isCollapsed && 'API Testing'}
                  </Link>
                </div>
              )}
            </div>
          )}


          {/* sonarqube */}



          <button onClick={toggleSonarqubeSubmenu} className="flex items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faChartLine} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
            {!isCollapsed && 'Sonarqube'} &nbsp;
            <FontAwesomeIcon icon={showSonarqubeSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
          </button>
          {showSonarqubeSubmenu && (
            <div className="mt-2 space-y-1 pl-8">
              <Link href="/sonarqube/monthlyMetrics" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Monthly Metrics'}
              </Link>
              <Link href="/sonarqube/licence-reclaim" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Licence Reclaimation'}
              </Link>
              <Link href="/sonarqube/project-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Project Provisioning'}
              </Link>
              <Link href="/sonarqube/user-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'User Provisioning'}
              </Link>
              <button onClick={toggleMiscSubmenu} className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faTools} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Miscellaneous'}
                <FontAwesomeIcon icon={showMiscSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
              </button>
              {showMiscSubmenu && (
                <div className="mt-2 space-y-1 pl-8">
                  <Link href="/sonarqube/misc/scan" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon icon={faDatabase} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                    {!isCollapsed && 'Daily Scan'}
                  </Link>
                  <Link href="/sonarqube/misc/apitesting" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon icon={faVial} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                    {!isCollapsed && 'API Testing'}
                  </Link>
                </div>
              )}
            </div>
          )}




          {/* genAi */}

          <button onClick={toggleGenAIubmenu} className="flex items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faChartLine} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
            {!isCollapsed && 'GenAI'} &nbsp;
            <FontAwesomeIcon icon={showGenAISubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
          </button>
          {showGenAISubmenu && (
            <div className="mt-2 space-y-1 pl-8">

              <Link href="/genai/monthlyMetrics" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Knowledge Base'}
              </Link>
              <Link href="/genai/licence-reclaim" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'Method Concierge'}
                </div>
              </Link>
              <Link href="/genai/project-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'Text to Report'}
                </div>
              </Link>
              <Link href="/genai/project-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'Text to SQL'}
                </div>
              </Link>
            </div>
          )}


          {/* jira cloud */}

          <button onClick={toggleJiraSaaSSubmenu} className="flex items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faChartLine} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
            {!isCollapsed && 'Jira SaaS'} &nbsp;
            <FontAwesomeIcon icon={showJiraSaaSSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
          </button>
          {showJiraSaaSSubmenu && (
            <div className="mt-2 space-y-1 pl-8">

              <Link href="/jira/monthlyMetrics" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Monthly Metrics'}
              </Link>
              <Link href="/jira/licence-reclaim" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'Licence Reclaimation'}
                </div>
              </Link>
              <Link href="/jira/project-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'Project Provisioning'}
                </div>
              </Link>
              <Link href="/jira/user-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                  {!isCollapsed && 'User Provisioning'}
                </div>
              </Link>
              <button onClick={toggleMiscSubmenu} className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faTools} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Miscellaneous'}
                <FontAwesomeIcon icon={showMiscSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
              </button>
              {showMiscSubmenu && (
                <div className="mt-2 space-y-1 pl-8">
                  <Link href="/jira/misc/attachment" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">

                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faDatabase} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'jiraCloud Extraction'}
                    </div>
                  </Link>
                  <Link href="/jira/misc/board-creation" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faClipboardList} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'Board Creation'}
                    </div>
                  </Link>
                  <Link href="/jira/misc/testdata-creation" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faDatabase} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'Test Data Creation'}
                    </div>
                  </Link>
                  <Link href="/jira/misc/pmt-creation" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faTools} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'PMT Creation'}
                    </div>
                  </Link>
                  <Link href="/jira/misc/api-testing" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <div className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                      <FontAwesomeIcon icon={faVial} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                      {!isCollapsed && 'API Testing'}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}
            

            {/* confluenceSaas */}

          <button onClick={toggleConfluenceSaaSSubmenu} className="flex items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faChartLine} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
            {!isCollapsed && 'Confluence SaaS'} &nbsp;
            <FontAwesomeIcon icon={showConfluenceSaaSSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
          </button>
          {showConfluenceSaaSSubmenu && (
            <div className="mt-2 space-y-1 pl-8">
              <Link href="/confluence/monthlyMetrics" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Monthly Metrics'}
              </Link>
              <Link href="/confluence/licence-reclaim" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Licence Reclaimation'}
              </Link>
              <Link href="/confluence/project-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faProjectDiagram} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Project Provisioning'}
              </Link>
              <Link href="/confluence/user-provisioning" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faUser} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'User Provisioning'}
              </Link>
              <button onClick={toggleMiscSubmenu} className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={faTools} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                {!isCollapsed && 'Miscellaneous'}
                <FontAwesomeIcon icon={showMiscSubmenu ? faChevronUp : faChevronDown} className="ml-auto" />
              </button>
              {showMiscSubmenu && (
                <div className="mt-2 space-y-1 pl-8">
                  <Link href="/confluence/misc/testdata-creation" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon icon={faDatabase} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                    {!isCollapsed && 'Test Data Creation'}
                  </Link>
                  <Link href="/confluence/misc/api-testing" className="flex items-center py-1 text-sm font-semibold text-white bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-700 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon icon={faVial} className={`mr-3 transition-transform duration-300 ${isCollapsed ? 'text-xl' : 'text-lg'}`} />
                    {!isCollapsed && 'API Testing'}
                  </Link>
                </div>
              )}
            </div>
          )}



        </div>
      </nav>
    </div>
  );
};

export default SideNavbar;