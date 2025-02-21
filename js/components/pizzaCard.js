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
        return ['pizza-img', 'alergens', 'pizza-nom', 'pizza-preu','pizza-desc','pizza-vege','subtotal'];
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
        const subtotal = this.getAttribute('subtotal' || preu);
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
                .price {
                    margin: 5%  18%;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                    width: 200px;
                }
                
                .price label {
                    font-weight: bold;
                    color: #333;
                }
                
                .price input {
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    text-align: center;
                    font-size: 16px;
                    width: 100%;
                    background: #fff;
                }
                
                .buttons {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 5px;
                }
                
                .buttons button {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background 0.3s ease;
                }
                
                .buttons button:hover {
                    background: #0056b3;
                }
                
                .buttons input {
                    width: 50px;
                    text-align: center;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .center{
                    display: inline;
                    align-items: center;
                }
                alegens-card {
                    margin: 10px;
                }
            </style>
            <div class="pizza-card">
                <img src="${this.serverUrl}${img}" alt="${nom}">
                <div class="content">
                    <h2>${nom}</h2>
                    <p>${desc}</p>
                    <p class="vege"><strong>Vegetariana:</strong> ${vege}</p>
                    <div id="center">
                        <div class="price">
                            <label>Preu</label>
                            <input id="preu" type="text" value="${preu}" readonly>
                            
                            <label>Subtotal</label>
                            <input id="subtotal" type="text" value="${subtotal}" readonly>
                            
                            <div class="buttons">
                                <button id="btn-decrease">−</button>
                                <input id="number"  value="1">
                                <button id="btn-increase">+</button>
                            </div>
                        </div>
                    </div>
                    <alergens-card alergens='${alergens}'></alergens-card>
                </div>
            </div>`;
    }

}
customElements.define('pizza-card', PizzaCard);


addEventListener("DOMContentLoaded", function() {
    let cantidad = document.getElementById("number");
    let preu = document.getElementById("preu");
    let subtotal = document.getElementById("subtotal")
    document.getElementById('btn-increase').addEventListener("click", function() {

        cantidad +=1;
        let resultado = `${preu * cantidad}`;
        subtotal.setAttribute('value', resultado);
    })
    document.getElementById('btn-decrease').addEventListener("click", function() {

    })
})