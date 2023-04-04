import Swal from "sweetalert2";
import { SafeAny } from "../types";
export const modalNotification = (title: string, icon: string, position: string) => {
    setTimeout(() => {
        (Swal.fire as SafeAny)({
            position: position,
            icon: `${icon}`,
            title,
            showConfirmButton: false,
            timer: 1500
        })
    }, 20);
};