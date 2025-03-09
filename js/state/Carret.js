class Carret extends EventTarget {
    constructor() {
        super();
        this.elements = []; // Lista de productos en el carrito
    }

    afegirProducte(producte) {
        let existent = this.elements.find(e => e.producte.id === producte.id);
        if (existent) {
            existent.quantitat++;
        } else {
            this.elements.push({ producte, quantitat: 1 });
        }
        console.log(this.elements);
        this.dispatchEvent(new Event("carretActualitzat")); // Notificar cambios
    }

    eliminarProducte(producte) {
        this.elements = this.elements.filter(e => e.producte.id !== producte.id);
        this.dispatchEvent(new Event("carretActualitzat")); // Notificar cambios
    }
    calcularQuantitatTotal() {
        return this.elements.reduce((total, e) => total + e.quantitat, 0);
    }

    calcularPreuTotal() {
        return this.elements.reduce((total, e) => total + e.producte.preu * e.quantitat, 0);
    }

    buidarCarret() {
        this.elements = []; // Vaciar la lista de productos
    }
}

export default Carret;
