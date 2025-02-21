
class LlistaAlergens extends HTMLElement{
    constructor() {
        //Cridar al constructor de la clase superior
        super();
        //Crear un shadowroot
        this.attachShadow({mode : 'open'})
    }
    static get observedAttributes() {
        return ['alergens'];
    }
    attributeChangedCallback() {
        this.render();
    }
    connectedCallback(){
        this.render();
    }
    render() {
        const alergens = JSON.parse(this.getAttribute('alergens') || '[]');
        this.shadowRoot.innerHTML = `
        <style>
            .alergen-list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px; /* Espacio entre los elementos */
                list-style: none;
                padding: 0;
                margin: 0;
                justify-content: center; /* Centrar los elementos */
            }
            
            .alergen-list li {
                background: #f8f8f8;
                border-radius: 10px;
                padding: 10px;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s ease-in-out;
            }
            
            .alergen-list li:hover {
                transform: scale(1.1); /* Efecto hover */
            }
            
            .alergen-list img {
                width: 40px; /* Ajusta el tamaño del icono */
                height: 40px;
                object-fit: contain;
            }

        </style>
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