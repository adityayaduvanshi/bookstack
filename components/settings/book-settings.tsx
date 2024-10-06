import React, { useState } from 'react';

const tabs = [
  'General',
  'Styling',
  'Export',
  'Team',
  'Billing',
  'My Account',
  'Feedback',
];

const BookSettingsDialog = () => {
  const [activeTab, setActiveTab] = useState('Styling');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg flex w-3/4 h-3/4 max-w-4xl">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4 border-r">
          <h2 className="text-xl font-bold mb-4">Book Settings</h2>
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`py-2 px-4 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">{activeTab}</h3>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content for Styling tab */}
          {activeTab === 'Styling' && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Trim Size
                </label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>8.5 H x 5.5 W (inches)</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Background
                </label>
                {/* Add background options here */}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Typography
                </label>
                <div className="mt-2">
                  <button className="bg-gray-200 px-4 py-2 rounded-l-md">
                    Web
                  </button>
                  <button className="bg-white px-4 py-2 rounded-r-md border">
                    Print
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Font Style
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="fontStyle"
                      value="classic"
                      checked
                    />
                    <span className="ml-2">Classic</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="fontStyle"
                      value="modern"
                    />
                    <span className="ml-2">Modern</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="fontStyle"
                      value="simple"
                    />
                    <span className="ml-2">Simple</span>
                  </label>
                </div>
              </div>

              {/* Preview section */}
              <div className="mt-6 border p-4 rounded-md">
                <h4 className="text-lg font-bold mb-2">Timeless Reads</h4>
                <p className="text-sm italic mb-4">
                  Exploring Worlds Through Words and Imagination
                </p>
                <p className="text-sm">
                  Books have always held a special place in human history,
                  transcending time and space. They offer a gateway to countless
                  worlds, each one filled with imagination, knowledge, and
                  wonder. From classic literature to modern novels, books allow
                  us to explore the depths of human experience and the boundless
                  creativity of the mind.
                </p>
                {/* Add more preview content as needed */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSettingsDialog;
