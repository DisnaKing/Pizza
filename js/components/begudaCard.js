// Importar components
import './CounterComponent.js';

// Importar el component base
import {CardComponent} from "./CardComponent.js";
import '../state/Carret.js';

class begudaCard extends CardComponent {
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
        return ['beguda-id','beguda-nom','beguda-preu','beguda-sucre','beguda-cafeina','beguda-alcohol'];
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
    render() {
        const id = this.getAttribute('beguda-id') || 'idBeguda';
        const nom = this.getAttribute('beguda-nom') || 'Beguda desconeguda';
        const preu = this.getAttribute('beguda-preu') || '0.00';
        const img = this.getAttribute('beguda-img') || '0';
        const sucre = this.getAttribute('beguda-sucre') || '0';
        const cafeina = this.getAttribute('beguda-cafeina') || '0';
        const alcohol = this.getAttribute('beguda-alcohol') || '0';
        this.shadowRoot.innerHTML = `
            <style>
                ${CardComponent.styles} /* Afegim estils del component base !! */
            </style>

            <div class="card">
                <img src="${img}" alt="imatge de la beguda" />
                <div class="content">
                    <h3>${nom}</h3>
                    <p>Preu: ${preu} €</p>
                    <p>Sucre: ${sucre}</p>
                    <p>Cafeina: ${cafeina}</p>
                    <p>Alcohol: ${alcohol}</p>
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
            () => {
                this.carret.afegirProducte(this.producte);
                this.carret.toString();
            },
            () => {
                this.carret.eliminarProducte(this.producte);
                this.carret.toString();
            }
        );
    }
}

// Crea l'element defineix l'element com a pizza-card
customElements.define('beguda-card', begudaCard);
