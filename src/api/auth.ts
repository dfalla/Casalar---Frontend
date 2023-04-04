import { createUser } from "../interfaces";
import Http from "../libs";
import axios from "../libs/axios";

export interface LoginArgs {
  username: string;
  password: string;
}

export const loginRequest = async ({ password, username }: LoginArgs) =>{
  const res = await Http.post("/auth/login", {
    username,
    password
  });

  console.log('res', res);
}

// export const registerRequest = async (data: createUser) =>
//   axios.post("/auth/register", data);

// export const profileRequest = async () => axios.get("/api/auth/profile");