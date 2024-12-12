import React, { useEffect, useState } from 'react';

export const LeftNav = ({ geoData, setGeoData, selectedFeature, setSelectedFeature }) => {
  const [searchText, setSearchText] = useState(''); 

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/features');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error('Failed to fetch features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const filteredData = geoData?.filter((data) =>
    data?.feature_id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-[20%] bg-gray-100 h-[90vh] p-3 flex flex-col gap-5 border-l-2 border-solid border-gray-500">
      <h1 className="font-bold">List of Places</h1>
      <div className="flex flex-col h-[90%] gap-5">
        <input
          type="search"
          className="w-full h-10 rounded-md p-3"
          placeholder="Search by ID..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} 
        />
        <div className="flex flex-col gap-4 h-[72vh] custom-scrollbar overflow-y-auto p-3">
          {filteredData?.map((data) => (
            <div
              key={data?.feature_id}
              className={`w-full p-1 gap-2 rounded-md bg-white flex items-center flex-wrap cursor-pointer ${
                data.feature_id === selectedFeature ? 'bg-gray-300' : ''
              }`}
              onClick={() => setSelectedFeature(data?.feature_id)}
            >
              <div
                className={`bg-green-400 h-6 w-6 rounded-md flex justify-center items-center text-white`} 
              >
                id
              </div>
              <span className="font-bold text-[10px] break-words min-w-0">{data?.feature_id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
