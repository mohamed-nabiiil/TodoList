import {  IUser } from "@/types";
import axiosInstance, { TODO_TOKEN_NAME, saveToken } from "./config";


type RegisterUSerTypes= IUser

export const registerUser = async({email,name,password}:RegisterUSerTypes)=>{
    try {
        const response = await axiosInstance.post("/users/create",{
            email,
            password,
            name,
        })
        return response.data.user;
    } catch (error) {
        console.log("error in register User",error);
        throw (error)
    }
}



type LogInUSerTypes= Omit<IUser,"name">

export const loginUser = async({email,password}:LogInUSerTypes)=>{
    try {
        const response = await axiosInstance.post("/users/login",{
            email,
            password,
        })
        const _token=response.data.token;
        axiosInstance.defaults.headers.common["Authorization"]=_token;
        saveToken(TODO_TOKEN_NAME,_token);
        return response.data.user;
    } catch (error) {
        console.log("error in Log in User",error);
        throw (error)
    }
}