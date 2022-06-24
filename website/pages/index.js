import React, {useEffect} from 'react';

import AddToChrome from "../components/addToChrome";
import UnsupportedBrowser from '../components/Unsupported';
import {deviceDetect} from 'react-device-detect';
import Loading from "../components/Loading";
import HowToUse from "../components/HowToUse";
import SupportUs from "../components/Support";

export default function Home() {
    const [device, setDevice] = React.useState(null)
    useEffect(() => {
        const detect_device = deviceDetect()
        setDevice(detect_device)
    }, [deviceDetect])
    return (<div className={"flex flex-col min-h-screen"}>
            <div
                className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 via-indigo-800 to-cyan-900">
                <div className={" w-full h-full px-4"}>
                    <div className={"flex justify-center my-4"}>
                        <a href={"/"} rel={"noreferrer"}
                           className={"text-3xl hover:text-gray-200 cursor-pointer font-bold text-white"}>Social
                            Stalker</a>
                    </div>
                    <div className={"flex flex-row justify-center flex-wrap  items-center "}>
                        <div className={"flex flex-col gap-2 justify-center text-center lg:text-left p-4"}>
                            <h1 className={"text-3xl antialiased font-bold max-w-xl text-white"}>Unlock ANY Facebook or
                                Instagram Profile Picture</h1>
                            <p className={"max-w-xs lg:mx-0 lg:text-left text-gray-300 mx-auto"}>With any chromium
                                browser you can use our extension to get the full sized Profile Picture of Any user on
                                instagram or facebook</p>
                        </div>
                        <div> {!device ? <Loading
                            text={"Please wait, We're checking your device compatibility"}/> : device.engineName === "Blink" ?
                            <AddToChrome device={device}/> : <UnsupportedBrowser device={device}/>}</div>
                    </div>
                </div>

            </div>
            <HowToUse device={device}/>

            <SupportUs/>
        </div>

    )
}