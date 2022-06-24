import {Rings} from "react-loader-spinner";

export default function Loading({text}) {
    return <div
        className={"flex flex-col my-4 bg-gray-800 text-gray-500 text-center mx-auto justify-center p-4 rounded-xl"}>
        <div className={"w-full mx-auto justify-center flex"}>
            <Rings color="#00BFFF"/>
        </div>
        <h1>{text}</h1>
    </div>
}