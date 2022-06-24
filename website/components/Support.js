import {MdEmail, MdFacebook} from "react-icons/md";
import {BsPaypal, BsTwitter} from "react-icons/bs";
import {BiHeart} from "react-icons/bi";
import {CgPatreon} from "react-icons/cg";
import React from "react";

export default function SupportUs(){
    return     <div className="flex flex-col items-center justify-center w-full py-8 text-center bg-indigo-100 gap-2 flex-1 min-h-full px-4">
        <h1 className={"font-bold text-3xl"}>Have Question or Report a Bug?</h1>
        <div>
            <h2>You can always reach out the developer of this extension on</h2>
            <div className={"flex flex-row flex-wrap gap-4 mx-auto justify-center"}>
                <div className={"flex flex-row items-center text-gray-800 gap-1"}>
                    <MdEmail size={18}/>
                    <a href={"mailto:m9nasr@outlook.com"} className={"font-medium"}>m9nasr@outlook.com</a>
                </div>
                <div className={"flex flex-row items-center text-gray-800 gap-1"}>
                    <MdFacebook size={18} className={"fill-blue-700"}/>
                    <a href={"https://fb.me/m9nasr"} target={"_blank"} className={"font-medium"} rel={"noreferrer"}>m9nasr</a>
                </div>
                <div className={"flex flex-row items-center text-gray-800 gap-1"}>
                    <BsTwitter size={18} className={"fill-blue-700"}/>
                    <a href={"https://twitter.com/m9nasr"} target={"_blank"} className={"font-medium"} rel={"noreferrer"}>m9nasr</a>
                </div>
            </div>

            <div className={"flex flex-col my-8"}>
                <div className={"flex flex-row  mx-auto items-center"}>
                    <BiHeart size={18}/>
                    <h1 className={"text-xl font-medium"}>Loved This Extension?</h1>
                </div>
                <div className={"flex flex-col "}>
                    <h1 className={"font-medium"}>I will glad if you supported me, it will mean too much for me and that's help keep our products FREE</h1>
                    <div className={"flex flex-row flex-wrap gap-4 justify-center my-2"}>
                        <button onClick={() => window.open("https://www.patreon.com/nasrika","_blank")} className={" rounded font-medium bg-amber-600 text-white p-2 w-fit"}>
                            <div className={"flex flex-row items-center gap-1"}>
                                <CgPatreon size={18}/>
                                <h1>Support on Patron</h1>
                            </div>
                        </button>
                        <button onClick={() => window.open("https://paypal.me/c7nasr?country.x=EG&locale.x=en_US","_blank")} className={" rounded font-medium bg-blue-600 text-white p-2 w-fit"}>
                            <div className={"flex flex-row items-center gap-1"}>
                                <BsPaypal size={18}/>
                                <h1>Support on PayPal</h1>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}