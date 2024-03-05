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

    nuevoGasto(gasto){
        // this.gastos.push(gasto);
        this.gastos=[...this.gastos, gasto];
        console.log(this.gastos);
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

    agregarGastoListado(gastos){
        // elimina el HTML PREVIO 
        this.limpiarHtml(); 
        
        gastos.forEach(gasto => {
            const {cantidad, nombre, id} = gasto;

            //crear Li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            //agregar el Html del gasto
            nuevoGasto.innerHTML = `
            ${nombre} <span class="badge badge-primary badge-pill">${cantidad}</span>
            `;
            
            //Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Borrar';
            btnBorrar.classList.add('btn-danger', 'btn', 'borrar-gasto');
            nuevoGasto.appendChild(btnBorrar);

            //Agregar el Html

            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHtml(){
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
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
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validar

    if (nombre ==="" || cantidad ==="") {
        ui.imprimirAlerta('Ambos campos son obligatorios','error');

        return;
    }else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no valida','error');
        return;

    }
    //Generar objeto con el gasto 
    const gasto ={
        nombre: nombre,
        cantidad: cantidad,
        id: Date.now(),
    }
    //añade nuevo gasto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado Correctamente');

    //imprimir los gastos
    const {gastos} = presupuesto
    ui.agregarGastoListado(gastos);

    //reinicia el formulario
    formulario.reset();
}
