import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const Layout = ({ children }) => {
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
        <Sidebar />
      <div className='flex flex-col flex-1 gap-3 mr-4 mt-3 overflow-hidden'>
        <Topbar />
        <div className='flex-1 overflow-y-auto hide-scrollbar'>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
