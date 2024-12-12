import { Button, Modal, notification } from 'antd';
import React, { useState, useEffect } from 'react';

export const OperationBar = ({ selectedFeature, setSelectedFeature, geoData, setGeoData }) => {
  const [featureData, setFeatureData] = useState(null);
  const [properties, setProperties] = useState('');
  const [geometry, setGeometry] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operation, setOperation] = useState('');

  useEffect(() => {
    if (selectedFeature) {
      fetchFeatureData();
    }
  }, [selectedFeature]);

  const fetchFeatureData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/features/${selectedFeature}`);
      const data = await response.json();
      setFeatureData(data);
      setProperties(JSON.stringify(data.properties, null, 2));  
      setGeometry(JSON.stringify(data.geometry, null, 2));      
    } catch (error) {
      console.error('Failed to fetch feature data:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const newFeature = {
        type: "Feature",
        geometry: JSON.parse(geometry),
        properties: JSON.parse(properties),
      };
      const response = await fetch('http://localhost:8000/api/v1/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeature),
      });
      if (response.ok) {
        notification.success({ message: 'Feature created successfully!' });
        setGeoData(prevData => [...prevData, newFeature]);  // Optionally update geoData in state
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        notification.error({ message: 'Failed to create feature', description: errorData.detail || 'Unknown error' });
      }
    } catch (error) {
      console.error('Failed to create feature:', error);
      notification.error({ message: 'Failed to create feature' });
    }
  };
    

  const handleUpdate = async () => {
    console.log(selectedFeature)
    const updatedFeature = {
      type: "Feature",
      geometry: JSON.parse(geometry), // Ensure geometry is a valid object
      properties: JSON.parse(properties), // Ensure properties is a valid object
    };
  
    try {
      const response = await fetch(`http://localhost:8000/api/v1/features/${selectedFeature}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFeature), // Ensure body is properly formatted
      });
  
      if (response.ok) {
        notification.success({ message: 'Feature updated successfully!' });
        // setGeoData(prevData => prevData.map(feature =>
        //   feature.feature_id === selectedFeature ? { ...feature, ...updatedFeature } : feature
        // ));
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        notification.error({ message: 'Failed to update feature', description: errorData.detail || 'Unknown error' });
      }
    } catch (error) {
      notification.error({ message: 'Failed to update feature' });
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/features/${selectedFeature}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        notification.success({ message: 'Feature deleted successfully!' });
        setGeoData(prevData => prevData.filter(feature => feature.feature_id !== selectedFeature));  
        setSelectedFeature(null); 
      }
    } catch (error) {
      notification.error({ message: 'Failed to delete feature' });
    }
  };

  const showDeleteConfirm = () => {
    setOperation('delete');
    setIsModalVisible(true);
  };

  const showUpdateConfirm = () => {
    setOperation('update');
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    if (operation === 'delete') {
      handleDelete();
    } else if (operation === 'update') {
      handleUpdate();
    }
    setIsModalVisible(false);
  };

  return (
    <div className='w-[22%] h-[90vh] bg-gray-100 p-3'>
      <div className='flex justify-between'>
        <h1 className='font-bold'>Data Manipulator</h1>
        <Button type='primary' onClick={handleCreate}>Create</Button>
      </div>
      <div className='bg-white h-[75%] w-full rounded-md mt-8 p-3 flex flex-col gap-3'>
        <div>
          <label className='font-bold'>Feature Id</label>
          <input
            type="text"
            value={selectedFeature || 'Select a Feature'}
            className='bg-gray-100 p-3 w-full h-8 mt-2 rounded-md'
            disabled
          />
        </div>
        <div className='h-[22%]'>
          <label className='font-bold'>Properties</label>
          <textarea
            type="text"
            value={properties}
            onChange={(e) => setProperties(e.target.value)}
            className='bg-gray-100 custom-scrollbar h-[70%] p-3 w-full mt-2 rounded-md'
          />
        </div>
        <div className='h-[49%]'>
          <label className='font-bold'>Geometry</label>
          <textarea
            type="text"
            value={geometry}
            onChange={(e) => setGeometry(e.target.value)}
            className='bg-gray-100 custom-scrollbar p-3 w-full h-[100%] mt-2 rounded-md'
          />
        </div>
      </div>
      <div className='w-full h-12 mt-3 flex justify-end gap-3 p-2 flex-wrap'>
        <Button color="danger" variant="solid" onClick={showDeleteConfirm}>Delete</Button>
        <Button color="primary" variant="solid" onClick={showUpdateConfirm}>Update</Button>
        <Button color="primary" variant="solid">Get</Button>
      </div>

      <Modal
        title="Are you sure?"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>{operation === 'delete' ? 'Are you sure you want to delete this f    eature?' : 'Are you sure you want to update this feature?'}</p>
      </Modal>
    </div>
  );
};
