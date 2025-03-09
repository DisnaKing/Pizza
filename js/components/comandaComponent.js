class ComandaComponent extends HTMLElement {
    static contadorComandes=0;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        ComandaComponent.contadorComandes++; // Incrementa el contador cada vegada que es crea una nova comanda

        // Utilitzar el contador per assignar un ID únic a la comanda
        const comandaID = ComandaComponent.contadorComandes;

        // Obtenir la data i hora actual
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('ca-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        this.shadow.innerHTML = `
            <style>
                .comanda {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    max-width: 400px;
                    margin: 20px auto;
                }
                .comanda:hover {
                    transform: translateY(-5px); /* Moure cap amunt per donar un efecte de "flotar" */
                    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Afegir una ombra més intensa quan el ratolí passa per sobre */
                }
                
                .comanda h3 {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 15px;
                    text-align: center;
                }
                
                #llista-comanda {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                }
                
                #llista-comanda li {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    border-bottom: 1px solid #ddd;
                    color: #555;
                    font-size: 16px;
                }
                
                #llista-comanda li:last-child {
                    border-bottom: none;
                }
                
                #total-comanda {
                    font-weight: bold;
                    color: #333;
                    font-size: 18px;
                    margin-left: 10px;
                }
                
                #total-comanda {
                    color: #2a9d8f; /* Color de text destacat (p. ex., verd) */
                }
                
                .comanda p {
                    text-align: right;
                    font-size: 18px;
                    margin-top: 20px;
                    color: #444;
                }
                
                #fecha-comanda {
                    font-size: 14px;
                    color: #777;
                    margin-top: 5px;
                    text-align: center;
                }
                
                </style>
            <div class="comanda">
                <h3 id="comanda-${comandaID}">Comanda #${comandaID}</h3>
                <h4 id="fecha-comanda">${formattedDate}</h4> <!-- Mostrar la data i hora -->
                <ul id="llista-comanda"></ul>
                <p>Total: <span id="total-comanda">0.00</span>€</p>
            </div>
        `;

    }

    setComanda(comanda) {
        const llistaComanda = this.shadow.querySelector("#llista-comanda");
        const totalComanda = this.shadow.querySelector("#total-comanda");

        llistaComanda.innerHTML = ""; // Limpiar la lista previa

        comanda.productes.forEach(({ producte, quantitat }) => {
            const li = document.createElement("li");
            li.textContent = `${producte.nom} x ${quantitat} - ${(producte.preu * quantitat).toFixed(2)}€`;
            llistaComanda.appendChild(li);
        });

        totalComanda.textContent = comanda.calcularPreuTotal().toFixed(2);
    }
}

customElements.define("comanda-component", ComandaComponent);
