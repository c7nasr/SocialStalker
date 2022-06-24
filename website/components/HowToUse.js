import React from "react";
import {MdDownload, MdFacebook, MdOutlineAdsClick} from "react-icons/md";

function HowToUse({device}) {
  return (
      <div className="flex flex-col items-center justify-center w-full py-16 text-center bg-indigo-50 gap-4">
          <h1 className={"text-4xl font-bold text-gray-600"}>Easy to Use</h1>

          <div className={"flex flex-row flex-wrap gap-8 container justify-center"}>
              <div className={"flex flex-col  rounded p-4 gap-2"}>
                  <div className={" rounded-xl w-fit p-2 mx-auto "}>
                      <MdDownload size={64} className={"fill-green-500"}/>
                  </div>
                  <h1 className={"max-w-xs font-medium text-cyan-900 text-lg"}>Click on Add to {device?.browserName || "My Browser"} to install the extension</h1>

              </div>

              <div className={"flex flex-col  rounded p-4 gap-2"}>
                  <div className={" rounded-xl w-fit p-2 mx-auto "}>
                      <MdFacebook size={64} className={"fill-cyan-500"}/>
                  </div>
                  <h1 className={"max-w-xs font-medium text-cyan-900 text-lg"}>Go to any Facebook or Instagram Profile</h1>

              </div>
              <div className={"flex flex-col  rounded p-4 gap-2"}>
                  <div className={" rounded-xl w-fit p-2 mx-auto "}>
                      <MdOutlineAdsClick size={64} className={"fill-amber-700"}/>
                  </div>
                  <h1 className={"max-w-xs font-medium text-cyan-900 text-lg"}>Right click anywhere on profile page and click "Unlock" from context menu</h1>

              </div>
          </div>

      </div>
  );
}

export default HowToUse;
