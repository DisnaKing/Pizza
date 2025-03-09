// Importar components
import './CounterComponent.js';

// Importar el component base
import {CardComponent} from "./CardComponent.js";
import '../state/Carret.js';

class entrantsCard extends CardComponent{
    constructor(){
        //cridar al constructor de la clase superior
        super();
        this.serverUrl = 'https://pizza-rest-server-production.up.railway.app';
    }

    /**
     * Funcio del cicle de vida que s'invoca quan el component s'afig al dom
     */
    connectedCallback() {
        this.render();
    }

    /**
     * funcio que observa els atributs
     * @returns {string[]}
     */
    static get observedAttributes() {
        return ['entrant-img', 'entrant-nom', 'entrant-preu','subtotal'];
    }

    /**
     * funcio que comprova els canvis en els atributs
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    /**
     * Creacio de l'objecte
     */
    render(){
        const nom = this.getAttribute('entrant-nom') || 'Entrant desconegut';
        const preu = this.getAttribute('entrant-preu') || '0.00';
        const img = this.serverUrl+this.getAttribute('entrant-img') || 'entrant';
        const id = this.getAttribute('entrant-id') || 'id';
        const subtotal = this.getAttribute('subtotal' || '0.00');
        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component base !! */
            </style>

            <div class="card">
                <img src="${img}" alt="Imatge de l'entrant" />
                <div class="content">
                    <h3>${nom}</h3>
                    <p>Preu: ${preu} €</p>
                </div>
                <counter-component></counter-component>
            </div>
        `;

        // Una vegada afegit el component, establim els callbacks
        if (!this.carret || !this.producte) {
            // Comprovem primer si el carret i el producte s'han proporcionat
            console.error("Error: No s'ha passat el carret o producte correctament!");
            return;
        }

        const counter = this.shadowRoot.querySelector("counter-component");
        // NOU: PER COMENTAR
        counter.setProducte(this.producte, this.carret);

        counter.setCallbacks(
            () => { this.carret.afegirProducte(this.producte); this.carret.toString(); },
            () => { this.carret.eliminarProducte(this.producte); this.carret.toString(); }
        );
    }
}

// Crea l'element defineix l'element com a pizza-card
customElements.define('entrants-card', entrantsCard);
