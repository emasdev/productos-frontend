import Swal from "sweetalert2";
import axios from "axios";

export function showAlert(title, icon, focus=""){
  if(focus != ""){
    document.getElementById(focus).focus()
  }

  Swal.fire({
    title,
    icon,
    customClass: {confirmButton: "btn btn-primary" ,popup:"animated zoomIn"}
  })
}

export function deleteProduct(_url, id, title, message){
  
  Swal.fire({
    title: title,
    text: message,
    icon: 'question',
    showCancelButton:true,
    confirmButtonText:'Si, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {

    if(result.isConfirmed){
      sendRequest('DELETE',{id:id},_url,'Eliminado con éxito')
    }
  })
}

export function confirmAlert(_url, id, title, message){

  const url = url+id
  Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'question',
    showCancelButton:true,
    confirmButtonText:'Si, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {

    console.log(result)
    if(result.isConfirmed){
      //enviar solicitud
      sendRequest('DELETE',{id:id},_url,'Eliminado con éxito')
    } else {
      showAlert("Operación cancelada", "info")
    }
  }).catch(e => {
    console.log(e)
  })

  // Swal.fire({
  //   title: title,
  //   text: message,
  //   icon:'question',
  //   showCancelButton:true,
  //   confirmButtonText:'Si, eliminar',
  //   cancelButtonText: 'Cancelar'
  // }).then((res) => {
  //   if(res.isConfirmed){
  //     //enviar solicitud
  //     sendRequest('DELETE',{id:id},_url,'Eliminado con éxito')
  //   } else {
  //     showAlert("Operación cancelada", "info")
  //   }
  // })

  // Swal.fire({
  //   title,
  //   icon,
  //   customClass: {confirmButton: "btn btn-primary" ,popup:"animated zoomIn"}
  // })
}

export function sendRequest(method, params, url, message){
  axios({
    method:method,
    url:url + "/" + params.id,
  }).then(res => {
    const status = res.status
    debugger
    if(status == 200){
      showAlert(message,"success")
      window.setTimeout(() => {
        window.location.href="/"
      },1000)
    } else {
      showAlert("Error en el servicio", "error")
    }
  }).catch((e) => {
    console.log(e)
    debugger
  })
}