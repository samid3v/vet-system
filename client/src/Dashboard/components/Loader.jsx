import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useApp } from '../hooks/useApp';

const Loader = () => {
  const { showLoader } = useApp();

  return (
    showLoader && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <ColorRing
          visible={true}
          height={80}
          width={80}
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClassName="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    )
  );
};

export default Loader;
