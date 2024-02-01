import React from 'react'

const Card = ({variant, icon, title, value, active=false}) => {
     const getColorClasses = () => {
          switch (variant) {
            case 'info':
              return `bg-blue-200 text-blue-800 ${active? 'border border-blue-800':'border-none'} `;
            case 'success':
              return `bg-green-200 text-green-800 ${active? 'border border-green-800':'border-none'} `;
            case 'warning':
              return `bg-yellow-200 text-yellow-800 ${active? 'border border-yellow-800':'border-none'}`;
            case 'danger':
              return `bg-red-200 text-red-800 ${active? 'border border-red-800':'border-none'}`;
            default:
              return `bg-gray-200 text-gray-800 ${active? 'border border-gray-800':'border-none'}`;
          }
        };
  return (
     <div className={`p-2  rounded-xl shadow-md ${getColorClasses()}`}>
      <div className="flex w-[250px] justify-center h-28 items-center">
        <div className="flex-shrink-0 mr-4 text-3xl">{icon}</div>
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
