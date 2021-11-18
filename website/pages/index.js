import React, { useEffect } from 'react';

import AddToChrome from "../components/addToChrome";
import UnsupportedBrowser from '../components/NotFound';
import { deviceDetect } from 'react-device-detect';
import HowToUse from '../components/HowToUse';

export default function Home() {
  const [device,setDevice] = React.useState({})
  useEffect(() => {
    const detect_device = deviceDetect()
    setDevice(detect_device)
  },[deviceDetect])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white bg-gray-900">


      <main className="flex flex-col items-center justify-center flex-1 w-full px-3 text-center">

        <h1 className="mt-3 mb-1 text-6xl font-bold ">
         Social Stalker Extension  
        </h1>
        <h2 className="mb-2 text-sm ">V3.1</h2>
          <h3>One Click to unlock any Profile Picture of any Facebook or Instagram profile</h3>
        {device.engineName === "Blink" ? <AddToChrome device={device}/> : <UnsupportedBrowser device={device}/>}
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <HowToUse/>
        </div>
      </main>

    
    </div>
  )
}
