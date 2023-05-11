import { useNavigate } from "react-router-dom";
import Http from "../../libs";
import { modalNotificationWarning } from "../../helpers";
import { SafeAny } from "../../common";
import { LoginArgs, RegisterArgs } from "../../interfaces";

export const loginRequest = async ({ password, username }: LoginArgs) =>{

  try {
    const {data} = await Http.post("/auth/login", {
      username,
      password
    });

    return data;

  } catch (error) {
    modalNotificationWarning((error as SafeAny).response.data.msg)
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
    modalNotificationWarning((error as SafeAny).response.data.msg)
  }
  
}

export const checkAuthToken = async() => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem('auth')!).state.token;
    
    if(!token) {
      localStorage.clear();
      navigate('/auth/login')
    } 
      
    try {
      
      const { data } = await Http.get("/auth/renew");
      
      console.log("data desde checkAuthToken", data)

      return data.token;

    } catch (error) {
      console.log(error)
    }
}
