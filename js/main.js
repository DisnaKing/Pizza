import { PizzaService } from "./services/PizzaService.js";
import "./components/PizzaCard.js";
import "./components/LlistaAlergens.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const pizzes = await PizzaService.getPizza();
        const llista = document.getElementById("divMenu");

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
            pizzaElement.setAttribute('subtotal', p.preu);
            // Agregar el elemento pizza a la lista
            llista.appendChild(pizzaElement);
        });

    } catch (error) {
        console.error("Error carregant les pizzes:", error);
    }
});
