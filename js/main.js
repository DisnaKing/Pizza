// Importar components
import './libcomponents/scaffold_component.js';
import './libcomponents/tab_component.js';
import "./components/PizzaCard.js";
import "./components/entrantsCard.js";
import "./components/begudaCard.js";
import "./components/LlistaAlergens.js";

// Importem el servei
import { PizzeriaService } from "./services/pizzeriaService.js";
import Carret from "./state/Carret.js";
import "./components/CarretComponent.js"
import './components/CarretStatusComponent.js';



document.addEventListener("DOMContentLoaded", async () => {

    //Crear el carret
    let carret = new Carret();


    try {
        // Constants per a les pizzes
        const pizzes = await PizzeriaService.getPizza();
        const llistaPizzes = document.getElementById("menuPizzes");

        // Constants per als entrants
        const entrants = await PizzeriaService.getEntrants();
        const llistaEntrants = document.getElementById("menuEntrants");

        // Constants per a les begudes
        const begudes = await PizzeriaService.getBeguda();
        const llistaBegudes = document.getElementById("menuBegudes");

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

            // Passem la propietat carret i producte a la targeta de la pizza
            pizzaElement.carret=carret;
            pizzaElement.producte=p;

            // Agregar el elemento pizza a la lista
            llistaPizzes.appendChild(pizzaElement);

        });



        entrants.forEach((e) => {
            // Crear el Web Component de la pizza
            const entrantElement = document.createElement("entrants-card");

            // Establecer atributos de la pizza
            entrantElement.setAttribute("entrant-id", e.id);
            entrantElement.setAttribute("entrant-nom", e.nom);
            entrantElement.setAttribute("entrant-preu", e.preu);
            entrantElement.setAttribute("entrant-img", e.img);

            // Passem la propietat carret i producte a la targeta de l'entrant
            entrantElement.carret=carret;
            entrantElement.producte=e;

            // Agregar el elemento pizza a la lista
            llistaEntrants.appendChild(entrantElement);
        });



        begudes.forEach((b) => {
            // Crear el Web Component de la pizza
            const begudaElement = document.createElement("beguda-card");

            // Establecer atributos de la pizza
            begudaElement.setAttribute("beguda-id", b.id);
            begudaElement.setAttribute("beguda-nom", b.nom);
            begudaElement.setAttribute("beguda-preu", b.preu);
            begudaElement.setAttribute("beguda-img", b.img);

            // Passem la propietat carret i producte a la targeta de l'entrant
            begudaElement.carret=carret;
            begudaElement.producte=b;

            // Agregar el elemento pizza a la lista
            llistaBegudes.appendChild(begudaElement);

        });

        // Localitem el component del carret
        const carretComponent = document.querySelector("carret-component");

        // I li passem el carret al component perquè puga escoltar events
        carretComponent.setCarret(carret);

        // Fem el mateix amb la pestanya (component CarretStatusComponent)
        const carretStatusComponent = document.querySelector("carret-status-component");
        // I li passem el carret al component perquè puga escoltar events
        carretStatusComponent.setCarret(carret);

    } catch (error) {
        console.error("Error carregant les dades:", error);
    }
});
