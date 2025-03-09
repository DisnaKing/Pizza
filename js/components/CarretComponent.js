import {BaseComponent} from "../libcomponents/base_component.js";
import {Comanda} from "../models/Comanda.js";
import "../components/comandaComponent.js";

class CarretComponent extends BaseComponent {
    constructor() {
        super();
        this.shadowRoot.innerHTML = `
            <style>
                ${BaseComponent.styles} 
                :host {
                    display: block;
                    padding: 10px;
                }
                .carret {
                    border: 1px solid #ddd;
                    padding: 10px;
                    border-radius: 5px;
                    background: white;
                }
                .carret h3 {
                    margin: 0 0 10px 0;
                }
                .producte {
                    display: flex;
                    justify-content: space-between;
                    padding: 5px 0;
                    border-bottom: 1px solid #eee;
                }
                .producte:last-child {
                    border-bottom: none;
                }
                .borrar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background-color: red;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.3s;
                }
                #Comanda {
                    background-color: #2a9d8f; /* Color de fons verd */
                    color: white; /* Color del text */
                    font-size: 16px; /* Mida de la lletra */
                    padding: 10px 20px; /* Espai al voltant del text */
                    border: none; /* Sense bordes */
                    border-radius: 5px; /* Cantons arrodonits */
                    cursor: pointer; /* Canvia el cursor quan el botó es passa per sobre */
                    transition: background-color 0.3s; /* Afegir transició per l'efecte al passar el ratolí */
                }
            
                #Comanda:hover {
                    background-color: #1f7e6f; /* Color de fons quan es passa el ratolí */
                }
            
                #Comanda:focus {
                    outline: none; /* Eliminar el contorn quan el botó es selecciona */
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Afegir una petita ombra quan el botó està actiu */
                }
            </style>
            <div class="carret">
                <h3>Carret de la compra</h3>
                <div id="llista-productes"></div>
                <p><strong>Total: <span id="total-preu">0.00</span>€</strong></p>
                <button id="Comanda">Realitzar Comanda</button>
            </div>
        `;


        this.shadowRoot.querySelector("#Comanda").addEventListener("click", () => {
            let comanda = new Comanda(this.carret);
            comanda.realitzarComanda(this.carret.elements);
        });


        this.carret = null;
    }

    setCarret(carret) {
        if (!carret) return;
        this.carret = carret;
        this.update();
        this.carret.addEventListener("carretActualitzat", () => this.update());
    }


    update() {
        console.log("Event capturat, actualitzant");
        if (!this.carret) return;
        const llista = this.shadowRoot.querySelector("#llista-productes");
        llista.innerHTML = "";

        this.carret.elements.forEach(({ producte, quantitat }) => {
            const div = document.createElement("div");
            div.classList.add("producte");
            div.innerHTML = `
                <span>${producte.nom} x ${quantitat} - ${(producte.preu * quantitat).toFixed(2)}€</span>
                <button class="borrar">-</button>
            `;

            div.querySelector(".borrar").addEventListener("click", () => {
                this.carret.eliminarProducte(producte);
                this.update();
            });

            llista.appendChild(div);
        });

        this.shadowRoot.querySelector("#total-preu").textContent = this.carret.calcularPreuTotal().toFixed(2);
        console.log("Event capturat, done");
    }
}

customElements.define("carret-component", CarretComponent);
