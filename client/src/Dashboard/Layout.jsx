import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const Layout = ({ children }) => {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Fixed Sidebar */}
        <Sidebar />
      {/* Flex container for the rest of the content */}
      <div className='flex flex-col flex-1 overflow-hidden mr-4'>
        {/* Fixed Topbar */}
        <Topbar />
        {/* Scrollable content section */}
        <div className='flex-1 overflow-y-auto'>
          <div className='my-2'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
