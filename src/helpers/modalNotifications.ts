import Swal from "sweetalert2";

export const modalNotification = (title: string) => {
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