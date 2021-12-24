import axios from "axios";
import {toast} from "react-toastify";
import {getCookie, getCookies, removeCookies, setCookies} from "cookies-next";

const API = "https://s0cialstalker.herokuapp.com"
export const Login = async (username, password) => {
    try {
        const {data} = await axios.post(`${API}/admin/login`,{username,password})
        setCookies('token', data.token,{maxAge:3600,});
        return true

    } catch (e) {
        console.log(e)
        toast.error("Wrong Credentials");
    }
}

export const GetUsersCount = async () => {
    try {
        const token = getCookie("token")
        const {data} = await axios.get(`${API}/admin/genders`,{headers:{token}})
        return data

    } catch (e) {
        console.log(e)
        toast.error("Unauthorized");
        removeCookies("token")
    }
}

export const GetUsedByCount = async () => {
    try {
        const token = getCookie("token")
        const {data} = await axios.get(`${API}/admin/users/gender`,{headers:{token}})
        return data

    } catch (e) {
        console.log(e)
        toast.error("Unauthorized");
        removeCookies("token")
    }
}

export const GetDetectionData = async () => {
    try {
        const token = getCookie("token")
        const {data} = await axios.get(`${API}/admin/users/`,{headers:{token}})
        return data

    } catch (e) {
        console.log(e)
        toast.error("Unauthorized");
        removeCookies("token")
    }
}