// variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');



//eventos
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
    
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
        document.querySelector('#restante').textContent = restante;     
    }

    imprimirAlerta(mensaje, tipo){
        //crar el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo==='error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
  
        }
        //mensaje
        divMensaje.textContent = mensaje;

        //insertar en el Html

        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //quitar del Html

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
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


//añade gasto

function agregarGasto(e){
    e.preventDefault();

    //leer datos del formulario}

    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    //validar

    if (nombre ==="" || cantidad ==="") {
        ui.imprimirAlerta('Ambos campos son obligatorios','error');

        return;
    }else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no valida','error');
        return;

    }
    console.log('Agregando gasto');
    
}