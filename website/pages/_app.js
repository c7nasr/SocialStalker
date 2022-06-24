import '../styles/global.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Footer from "./../components/footer"
import Head from "next/head";
import {Toaster} from "react-hot-toast";

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <title>SocialStalker - Unlock ANY Facebook or Instagram Profile Picture</title>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="theme-color" content="#f3f4f6"/>
            <link rel="apple-touch-icon" href="/favicon-96x96.png"/>
            <meta name="apple-mobile-web-app-status-bar" content="#f3f4f6"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
            <meta name="apple-mobile-web-app-title" content="SocialStalker"/>
            <meta name="title" content="SocialStalker - Unlock ANY Facebook or Instagram Profile Picture" />
            <meta name="description" content="SocialStalker - Unlock ANY Facebook or Instagram Profile Picture" />
            <meta name="keywords" content="SocialStalker,Extension,facebook,instagram,Unlock Profile Picture" />
            <meta name="robots" content="index, follow"/>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta name="language" content="English"/>
            <meta name="author" content="nasrika.com"/>
        </Head>
        <Toaster/>
        <Component {...pageProps} />
        <Footer/>

    </>

}

export default MyApp
