import { useState } from 'react'
import { Header } from './components/Header'
import { LeftNav } from './components/MainContainer/LeftNav'
import { MapRep } from './components/MainContainer/MapRep'
import { OperationBar } from './components/MainContainer/OperationBar'

function App() {
  const [geoData, setGeoData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className='h-screen w-screen'>
        <Header/>
        <div className='w-full flex flex-wrap'>
            <LeftNav geoData={geoData} setGeoData={setGeoData} selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature}/>
            <MapRep geoData={geoData}/>
            <OperationBar selectedFeature={selectedFeature} setGeoData={setGeoData} setSelectedFeature={setSelectedFeature}/>
        </div>
    </div>
  )
}

export default App
