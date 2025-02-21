import { Pizza } from "../models/Pizza.js";
export class PizzaService {
    // URL de la API
    static API_URL = 'https://pizza-rest-server-production.up.railway.app/api/pizzeria/pizzes';

    /**
     * Funció per a obtindre les pizzes de la API
     * @returns {Promise<Array>}
     */
    static async getPizza() {
        try {
            // Fem el fetch
            const resposta = await fetch(this.API_URL);

            // Si no pot fer el fetch, torna l'error
            if (!resposta.ok) {
                throw new Error(`Error ${resposta.status}: No s'han pogut carregar les pizzes`);
            }

            // Convertim la resposta a JSON
            const dadesPG = await resposta.json();
            console.log(dadesPG);

            // Verifiquem que les dades tenen el format esperat
            if (!dadesPG.records || !Array.isArray(dadesPG.records)) {
                throw new Error('El format de les dades no és vàlid');
            }

            // Llista de pizzes
            return dadesPG.records.map(dada => new Pizza(dada));
        } catch (error) {
            console.error("Error carregant les pizzes:", error.message);
            return []; // Retornem un array buit en cas d'error
        }
    }
}
