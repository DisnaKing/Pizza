import { BaseComponent } from "../libcomponents/base_component.js";
class LlistaAlergens extends BaseComponent {
    constructor() {
        //Cridar al constructor de la clase superior
        super();
    }
    static get observedAttributes() { // Observa els atributs de l'objecte
        return ['alergens'];
    }
    attributeChangedCallback() { // Realitza el render cada vegada que canvia un atribut
        this.render();
    }
    connectedCallback(){ // Realitza el render al crearse l'objecte
        this.render();
    }
    render() {
        const alergens = JSON.parse(this.getAttribute('alergens') || '[]');
        this.shadowRoot.innerHTML = `
        <style>
            .alergen-list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px; /* Espai entre els elements*/
                list-style: none;
                padding: 0;
                margin: 0;
                justify-content: center; /* Centrar els elements */
            }
            
            .alergen-list li {
                background: #f8f8f8;
                border-radius: 10px;
                padding: 10px;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s ease-in-out;
            }
            
            .alergen-list li:hover {
                transform: scale(1.1); /* Efecte Hover */
            }
            
            .alergen-list img {
                width: 40px; /* Ajusta el tamany de la icona */
                height: 40px;
                object-fit: contain;
            }

        </style> 
        <!-- Element alergens-card -->
        <ul class="alergen-list">
            ${alergens.map(a => `
                <li>
                    <img src="../../img/${a}.png" alt="${a}" title="${a}">
                </li>
            `).join('')}
        </ul>`;
    }
}
customElements.define('alergens-card',LlistaAlergens);