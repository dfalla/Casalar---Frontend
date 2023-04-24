import Swal from "sweetalert2";
import { Alert, AlertIcon } from '@chakra-ui/react'

export const modalNotificationWarning = (title: string) => {
    setTimeout(() => {
        Swal.fire({
            position: "center",
            icon: 'warning',
            title,
            showConfirmButton: false,
            timer: 1500
        })
    }, 20);
};


export const modalNotificationsSuccess = (title: string) =>{
    setTimeout(() => {
        Swal.fire({
            position: "top-end",
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 1500
        })
    }, 20);
}