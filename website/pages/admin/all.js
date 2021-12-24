import {useEffect, useState} from "react";
import {GetDetectionData, GetUsedByCount, GetUsersCount} from "../../libs/api";
import {getCookie} from "cookies-next";

const  All = () => {
    const [users, setUsers] = useState({});
    useEffect(() => {
    const getData = async () =>{
        let data = {}
        data.detected = await GetUsersCount()
        data.used = await GetUsedByCount()
        data.detection = await GetDetectionData()

        setUsers(data)
    }

    getData()
    })
    return <p>{JSON.stringify(users)}</p>
}
export const getServerSideProps = ({ req, res }) => {
    const isExisted = getCookie('token', { req, res});
    if (!isExisted){
        return {
            redirect: {
                permanent: false,
                destination: "/admin"
            }
        }
    }
    return { props: {}};
}
export default All
