// Importar components
import "./LlistaAlergens.js"
import './CounterComponent.js';

// Importar el component base
import {CardComponent} from "./CardComponent.js";
import '../state/Carret.js';

class PizzaCard extends CardComponent {
    constructor(){
        //cridar al constructor de la clase superior
        super();
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
        return ['pizza-img', 'alergens', 'pizza-nom', 'pizza-preu','pizza-desc','pizza-vege','subtotal'];
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
        const nom = this.getAttribute('pizza-nom') || 'Pizza desconeguda';
        const preu = this.getAttribute('pizza-preu') || '0.00';
        const desc = this.getAttribute('pizza-desc') || 'Descripcio';
        const vege = this.getAttribute('pizza-vege');
        const img = this.serverURL+this.getAttribute('pizza-img') || '0';
        const alergens = this.getAttribute('alergens') || [];
        const defaultImg = 'https://cdni.iconscout.com/illustration/premium/thumb/error-404-illustration-download-in-svg-png-gif-file-formats--not-found-page-restaurant-pack-food-drink-illustrations-3569464.png?f=webp'
        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles}
            </style>
            <div class="card">
                <img src="${img}" alt="Imatge de la pizza" />
                <div class="content">
                    <h3>${nom}</h3>
                    <p>Ingredients: ${desc}</p>
                    <p>Preu: ${preu} €</p>
                    <alergens-card pizza-alergens="${alergens}"></alergens-card>
                </div>
                <counter-component></counter-component>
            </div>`;
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
customElements.define('pizza-card', PizzaCard);
