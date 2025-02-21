import "./LlistaAlergens.js"
class PizzaCard extends HTMLElement {
    constructor(){
        //cridar al constructor de la clase superior
        super();
        //Crear un Shadowroot
        this.attachShadow({mode : 'open'})
        //
        this.serverUrl = 'https://pizza-rest-server-production.up.railway.app';
    }

    /**
     * Funcio del cicle de vida que s'invoca quan el component s'afig al dom
     */
    connectedCallback() {
        this.render();
    }
    static get observedAttributes() {
        return ['pizza-img', 'alergens', 'pizza-nom', 'pizza-preu','pizza-desc','pizza-vege'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
         this.render();
    }
    render(){
        const nom = this.getAttribute('pizza-nom') || 'Pizza desconeguda';
        const preu = this.getAttribute('pizza-preu') || '0.00';
        const desc = this.getAttribute('pizza-desc') || 'Descripcio';
        const vege = this.getAttribute('pizza-vege');
        const img = this.getAttribute('pizza-img') || 'Imatge';
        const alergens = this.getAttribute('alergens') || [];
        this.shadowRoot.innerHTML = `
            <style>
                .pizza-card {
                    display: inline-block;
                    font-family: Arial, sans-serif;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    max-width: 400px;
                    margin: 10px;
                    transition: transform 0.2s;
                }
                .pizza-card:hover {
                    transform: scale(1.05);
                }
                .pizza-card img {
                    width: 100%;
                    height: auto;
                    border-bottom: 1px solid #ddd;
                }
                .pizza-card .content {
                    padding: 16px;
                }
                .pizza-card .content h2 {
                    margin: 0;
                    font-size: 1.5em;
                    color: #333;
                }
                .pizza-card .content p {
                    margin: 8px 0;
                    color: #666;
                }
                .pizza-card .content .price {
                    font-size: 1.2em;
                    color: #e91e63;
                }
                .pizza-card,.content,.vege {
                    font-size: 0.9em;
                    color: #4caf50;
                }
                .pizza-card .content .alergens {
                    font-size: 0.8em;
                    color: #f44336;
                }
                .price{
                    display: inline-block;
                    max-width: 50px;
                    text-align: center;
                }
            </style>
            <div class="pizza-card">
                <img src="${this.serverUrl}${img}" alt="${nom}">
                <div class="content">
                    <h2>${nom}</h2>
                    <p>${desc}</p>
                    <p class="vege"><strong>Vegetariana:</strong> ${vege}</p>
                    <alergens-card alergens='${alergens}'></alergens-card>
                    <label>Preu</label>
                    <input class="price" value="${preu}">
                </div>
            </div>`;
    }

}
customElements.define('pizza-card', PizzaCard);