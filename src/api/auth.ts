import { SafeAny } from "../common";
import { modalNotification } from "../helpers/modalNotifications";
import Http from "../libs";

export interface LoginArgs {
  username: string;
  password: string;
}

export interface RegisterArgs {
  nombre: string;
  apellido: string;
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
    modalNotification((error as SafeAny).response.data.msg)
  }
}



export const registerRequest = async ({apellido, nombre, password, username}:RegisterArgs) => {
  try {
    const {data} = await Http.post("/auth/register", {
      apellido, 
      nombre,
      username,
      password
    });

    return data;

  } catch (error) {
    modalNotification((error as SafeAny).response.data.msg)
  }
  
}
