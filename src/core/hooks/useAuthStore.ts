import Swal from "sweetalert2";
import Http from "../../common/http";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { SafeAny, modalNotification } from "../../common";
import { Navigate } from "react-router-dom";

export interface ArgsLogin {
    username: string;
    password: string;
}

export interface ArgsRegister {
    nombre: string;
    apellido: string;
    username: string;
    password: string;
}


export const useAuthStore = () => {
    const { status, user, errorMessage } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const startLogin = async({username, password}: ArgsLogin) =>{
        dispatch(onChecking());

        try {
            const { data } = await Http.post('/auth/login', {username, password});
            console.log('data',data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            localStorage.setItem('name', data.nombre);
            localStorage.setItem('lastName', data.apellido);

            dispatch(onLogin({name: data.nombre, lastName: data.apellido, uid: data.uid, token: data.token}));

            console.log(data);

            
        } catch (error) {
            console.log(error)
            dispatch(onLogout('Username o password incorrectos'))
            modalNotification((error as SafeAny).response.data.msg, 'error','center');
        }

    }


    const startRegister = async({nombre, apellido, password, username}: ArgsRegister) => {
        dispatch(onChecking());

        try {
            const { data } = await Http.post('/auth/register', { nombre, apellido, password, username });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(onLogin({ name: data.name, uid: data.uid, token: data.token }));


            console.log(data)

        } catch (error) {
            modalNotification('Error al registrar a usuario', 'warning', 'center');
            dispatch(onLogout( (error as SafeAny).response.data?.msg || 'Error al registrar al usuario' ));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }


    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if(!token)  return dispatch(onLogout);

        try {
            const { data } = await Http.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(onLogin({ name: data.nombre, uid: data.uid }));


        } catch (error) {
            localStorage.clear();
            dispatch( onLogout );
        }
    }

    const startLogout = () =>{
        Swal.fire({
            title: `¿Desea cerrar sesión?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Salir',
            cancelButtonText: 'Cancelar',
          }).then(( result )=>{
            if(result.isConfirmed) {
                localStorage.clear();
                dispatch( onLogout({payload: 'Error al cerrar sesión'}) );
            }
        });
    }

    return {
        status,
        user,
        errorMessage,
    
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    
      }

}

