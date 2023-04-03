import { useDispatch } from "react-redux"
import Swal from "sweetalert2";
import Http from "../../common/http";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";
import { useAppSelector } from "./hooks";
import { SafeAny, modalNotification } from "../../common";

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
    const dispatch = useDispatch();

    const startLogin = async({username, password}: ArgsLogin) =>{
        dispatch(onChecking());

        try {
            const { data } = await Http.post('/auth', {username, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.nombre, uid: data.uid, token: data.token}));

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
            localStorage.setItem('token-init-date', new Date().getTime());

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
            localStorage.setItem('token-init-date', new Date().getTime());

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
                dispatch( onLogout );
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

