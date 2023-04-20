import { SafeAny } from "../common";
import { modalNotification } from "../helpers/modalNotifications";
import Http from "../libs";
import { useAuthStore } from "../store";

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

export const checkAuthToken = async() => {

  // const logout = useAuthStore((state) => state.logout);
  // const setToken = useAuthStore((state) => state.setToken);


    const token = JSON.parse(localStorage.getItem('auth')!).state.token;

    // if(!token) return logout();

    try {
      
      const { data } = await Http.get('/auth/renew');
      return data.token;
      console.log("data", data)
      // setToken(data.token);

    } catch (error) {
      console.log(error)
    }
}
