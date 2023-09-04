import Swal from 'sweetalert2';

const showAlert = ({text, title='', icon='warning'})=>{
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'Ok'
      })
}

export {showAlert}