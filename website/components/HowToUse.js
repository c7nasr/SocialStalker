import React from "react";

function HowToUse() {
  return (
    <div className="flex flex-col items-center justify-around max-w-4xl space-y-4 antialiased font-semibold text-black mb-11 sm:w-full">
        <h3 className="text-5xl text-white ">3 Easy Steps</h3>
      <div className="flex flex-col items-center justify-center w-full h-auto m-auto bg-white shadow-md cursor-pointer p-7 rounded-2xl hover:bg-gray-300">
        <h1 className="text-2xl font-bold">Install Extension</h1>
        <p className="text-gray-600 ">
          From the above button Click add to browser to add extension to your
          browser
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto m-auto bg-white shadow-md cursor-pointer p-7 rounded-2xl hover:bg-gray-300">
      <h1 className="text-2xl font-bold">Go to any Facebook or Instagram Profile</h1>

      <p className="text-gray-600 ">
         After installing, Go to your target Instagram or Facebook Profile Picture Profile
        </p>

      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto m-auto bg-white shadow-md cursor-pointer p-7 rounded-2xl hover:bg-gray-300">
      <h1 className="text-2xl font-bold">  Right click anywhere on the profile to see options</h1>
      <p className="text-gray-600 ">
        On Instagram and facebook profiles you will see Unlock Profile Picture in context menu. tap on it and it will show a popup of HD Image.
        </p>

      
      </div>
    </div>
  );
}

export default HowToUse;
