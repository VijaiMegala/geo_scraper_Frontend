import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const MapRep = ({ geoData }) => {
  if (!geoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-300 w-[58%] h-[90vh] p-8'>
      <div className='h-full w-full bg-white rounded-md p-3'>
        <h1 className='font-bold text-xl'>Karnataka Map Representation</h1>
        <div className='h-5/6 w-full rounded-md mt-12'>
          <MapContainer
            center={[15.3173, 75.7139]}
            zoom={7}
            style={{ height: "100%", width: "100%", borderRadius:"10px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoData.map((feature) => (
              <GeoJSON
                key={feature.feature_id}
                data={feature.geometry}
                onEachFeature={(featureData, layer) => {
                  layer.bindPopup(
                    `<strong>Feature ID:</strong> ${feature.feature_id}<br>
                    <strong>Properties:</strong> ${JSON.stringify(feature.properties)}`
                  );
                }}
              />
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
