import { PizzaService } from "./services/pizzaService.js";
import { entrantsService } from "./services/entrantsService.js";
import "./components/PizzaCard.js";
import "./components/entrantsCard.js";
import "./components/LlistaAlergens.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const pizzes = await PizzaService.getPizza();
        const llistaPizzes = document.getElementById("menuPizzes");

        pizzes.forEach((p) => {
            // Crear el Web Component de la pizza
            const pizzaElement = document.createElement("pizza-card");

            // Establecer atributos de la pizza
            pizzaElement.setAttribute("pizza-id", p.id);
            pizzaElement.setAttribute("pizza-nom", p.nom);
            pizzaElement.setAttribute("pizza-preu", p.preu);
            pizzaElement.setAttribute("pizza-desc", p.desc);
            pizzaElement.setAttribute("pizza-vege", p.vegetariana ? "SI" : "NO");
            pizzaElement.setAttribute("pizza-img", p.img);
            pizzaElement.setAttribute("alergens", JSON.stringify(p.alergens));
            pizzaElement.setAttribute('subtotal', '0.00');
            // Agregar el elemento pizza a la lista
            llistaPizzes.appendChild(pizzaElement);

        });

        const entrants = await entrantsService.getEntrants();
        const llistaEntrants = document.getElementById("menuEntrants");

        entrants.forEach((e) => {
            // Crear el Web Component de la pizza
            const entrantElement = document.createElement("entrants-card");

            // Establecer atributos de la pizza
            entrantElement.setAttribute("entrant-id", e.id);
            entrantElement.setAttribute("entrant-nom", e.nom);
            entrantElement.setAttribute("entrant-preu", e.preu);
            entrantElement.setAttribute("entrant-img", e.img);
            entrantElement.setAttribute('subtotal','0.00');
            // Agregar el elemento pizza a la lista
            llistaEntrants.appendChild(entrantElement);
        });
    } catch (error) {
        console.error("Error carregant les dades:", error);
    }
});
