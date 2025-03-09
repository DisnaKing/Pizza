import {CardComponent} from "./CardComponent.js";
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
    render(){
        const id = this.getAttribute('beguda-id')|| 'idBeguda';
        const nom = this.getAttribute('beguda-nom') || 'Beguda desconeguda';
        const preu = this.getAttribute('beguda-preu') || '0.00';
        const img = this.getAttribute('beguda-img') || '0';
        const sucre = this.getAttribute('beguda-sucre') || '0';
        const cafeina = this.getAttribute('beguda-cafeina') || '0';
        const alcohol = this.getAttribute('beguda-alcohol') || '0';
        const subtotal = this.getAttribute('subtotal' || preu);
        const defaultImg = 'https://img.freepik.com/psd-gratis/bebida-energetica-vibrante-puede-disenar-arte-abstracto_191095-85978.jpg'
        this.shadowRoot.innerHTML = `
            <style>
                .pizza-card {
                    display: inline-block;
                    font-family: Arial, sans-serif;
                    border: 1px solid var(--secondary-color);
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    max-width: 400px;
                    min-width: 400px;
                    margin: 10px;
                    transition: transform 0.2s;
                    
                }
                .pizza-card:hover {
                    transform: scale(1.03);
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
                    background: darkseagreen;
                    color: white;
                    border: none;
                    padding: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background 0.3s ease;
                }
                
                .buttons button:hover {
                    background: darkolivegreen;
                }
                
                .buttons input {
                    width: 50px;
                    text-align: center;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                #center{
                    justify-content: center;
                }
                alegens-card {
                    margin: 10px;
                }
            </style>
            <div class="pizza-card">
                <img src="${this.serverUrl}${img}" alt="${nom}" onerror="this.onerror=null;this.src='${defaultImg}'">
                <div class="content">
                    <h2>${nom}</h2>
                    <h3>Sucre: ${sucre}</h3>
                    <h3>Cafeina: ${cafeina}</h3>
                    <h3>Alcohol: ${alcohol}</h3>
                    <div id="center">
                        <div class="price">
                            <label>Preu</label>
                            <input id="preu" type="number" value="${preu}" readonly>
                            
                            <label>Subtotal</label>
                            <input id="subtotal" type="number" value="${subtotal}" readonly>
                            
                            <div class="buttons">
                                <button id="btn-decrease">−</button>
                                <input id="number"  value="0" readonly>
                                <button id="btn-increase">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        this.calcularSubtotal();
    }

    /**
     * Crea els listeners per a quan es sume o reste quantitat
     */
    calcularSubtotal(){
        const shadow = this.shadowRoot
        const cantidadInput = shadow.querySelector("#number");
        const preuInput = shadow.querySelector("#preu");
        const subtotalInput = shadow.querySelector("#subtotal");
        const btnIncrease = shadow.querySelector("#btn-increase");
        const btnDecrease = shadow.querySelector("#btn-decrease");

        if (!btnIncrease || !btnDecrease || !cantidadInput || !preuInput || !subtotalInput) return;

        let cantidad = parseInt(cantidadInput.value, 10)
        let preu = parseFloat(preuInput.value);

        btnIncrease.addEventListener("click", () => {
            cantidad++;
            cantidadInput.value = cantidad;
            subtotalInput.value = (preu * cantidad).toFixed(2);

        })
        btnDecrease.addEventListener("click", () => {
            if(cantidad > 0){
                cantidad--;
                cantidadInput.value = cantidad;
                subtotalInput.value = (preu * cantidad).toFixed(2);
            }

        })
    }
}

// Crea l'element defineix l'element com a pizza-card
customElements.define('beguda-card', begudaCard);
