import {ShowMyAlert} from "../libcomponents/MyAlert.js";

export class Comanda {
    constructor(carret) {
        this.productes = carret ? [...carret.elements] : []; // Copiamos los elementos del carrito
        this.total = carret ? carret.calcularPreuTotal() : 0;
        this.carret = carret;
    }

    realitzarComanda(carret) {
        if (!carret || this.carret.elements.length === 0) {
            // Aquí revisamos el estado de 'elements' del carrito directamente
            ShowMyAlert("error", "El carret esta buit");
            return;
        }
        const llistaComandes = document.getElementById("comandes");

        // Crear un nuevo "comanda-component"
        const comandaComponent = document.createElement("comanda-component");
        comandaComponent.setComanda(this);
        
        // Aquí es fa servir insertBefore per afegir el component abans de l'últim element de llistaComandes
        const primerElement = llistaComandes.firstChild; // Això obté el primer element fill dins llistaComandes
        if (primerElement) {
            llistaComandes.insertBefore(comandaComponent, primerElement); // Afegeix el comandaComponent abans del primer element
        } else {
            llistaComandes.appendChild(comandaComponent); // Si no hi ha cap element, afegeix-lo com a primer fill
        }

        // Vaciar el carrito después de realizar la comanda
        this.carret.buidarCarret();

        // Aquí obtenemos el CarretComponent desde el DOM y actualizamos
        const carretComponent = document.querySelector("carret-component");
        if (carretComponent) {
            carretComponent.update(); // Actualizamos el componente CarretComponent
        }

        // Actualizar el CarretStatusComponent
        const carretStatusComponent = document.querySelector("carret-status-component");
        if (carretStatusComponent) {
            // Llamamos al método de actualización del CarretStatusComponent
            carretStatusComponent.update();
        }
        ShowMyAlert("success", "Comanda realitzada");
    }

    // Método para calcular el precio total de la comanda
    calcularPreuTotal() {
        return this.productes.reduce((total, { producte, quantitat }) => {
            return total + (producte.preu * quantitat); // Sumar el precio total
        }, 0);
    }
}
