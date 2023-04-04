import { createUser } from "../interfaces";
import Http from "../libs";
import axios from "../libs/axios";
import { useAuthStore } from "../store";

export interface LoginArgs {
  username: string;
  password: string;
}

export const loginRequest = async ({ password, username }: LoginArgs) =>{

  try {
    const {data} = await Http.post("/auth/login", {
      username,
      password
    });

    return data;

  } catch (error) {
    //Tabajar aquí
    console.log(error)
  }
  



}

// export const registerRequest = async (data: createUser) =>
//   axios.post("/auth/register", data);

// export const profileRequest = async () => axios.get("/api/auth/profile");