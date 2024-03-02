// variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');



//eventos
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}





//classes




//Funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto?');

    if (presupuestoUsuario==='' || presupuestoUsuario===null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        // preguntarPresupuesto(); 
        window.location.reload();
    }
}