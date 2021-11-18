import { AiFillChrome } from "react-icons/ai";
import { BsPatchCheckFill } from "react-icons/bs";
import React from "react";

function AddToChromium({ device }) {

  return (
    <div className="w-auto p-5 m-auto text-center text-white bg-green-700 border-2 border-green-700 shadow-2xl max-w-max rounded-xl my-7">
      <div className="relative m-auto text-center text-white border-0 rounded ">
        <span className="justify-center inline-block mr-2 text-xl align-middle">
          <BsPatchCheckFill />
        </span>
        <span className="inline-block align-middle ">
          <b className="capitalize">PASSED!</b> Your browser compatible with this
          extension!
        </span>
      </div>
      <button onClick={() => window.open("https://chrome.google.com/webstore/detail/socialstalker/bnjakllpnheepljakkbkjjgclejaiiah","_blank")} className="flex items-center justify-center w-full p-2 m-auto mt-1 text-2xl align-middle border border-gray-400 rounded-2xl hover:bg-green-800 hover:text-green-50 hover:border-0">
        <AiFillChrome size="24" className="mr-1" />
        Add to your {device.browserName}
      </button>
      <div className="flex flex-col mt-2 font-mono text-xs">
        <span>{device.userAgent}</span>
        <span className="mt-1">
          {device.osName} {device.osVersion}
        </span>
      </div>
    </div>
  );
}

export default AddToChromium;
