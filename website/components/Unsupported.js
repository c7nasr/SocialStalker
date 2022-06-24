import { MdError } from "react-icons/md";
import React from 'react'

function UnsupportedBrowser({device}) {
    return (
        <div className="w-auto p-5  text-center text-white bg-red-700 max-w-max rounded-xl my-7 mx-4">
            <div className="relative m-auto text-center text-white border-0 rounded ">
            <span className="justify-center inline-block mr-2 text-xl align-middle">
              <MdError />
            </span>
            <span className="inline-block align-middle ">
              <b className="capitalize">FAILED!</b> Your browser is not compatible with this
              extension!
            </span>
          </div>
          <div className="flex flex-col mt-2 font-mono text-xs">
            <span>{device.userAgent}</span>
            <span className="mt-1">
              {device.osName} {device.osVersion}
            </span>
          </div>
        </div>
      );
}

export default UnsupportedBrowser
