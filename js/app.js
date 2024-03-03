// variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');



//eventos
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    
}





//classes

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos=[];
    }
}

class UI{
    insertarPresupuesto(cantidad){
        //extrayendo el valor
        const {presupuesto, restante } = cantidad;

        //agregando al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#total').textContent = restante;     
    }
}

const ui=new UI();

let presupuesto;


//Funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto?');

    if (presupuestoUsuario==='' || presupuestoUsuario===null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        // preguntarPresupuesto(); 
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    
    ui.insertarPresupuesto(presupuesto); 
}