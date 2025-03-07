import { Pizza } from "../models/Pizza.js";
import {Entrants} from "../models/Entrants.js";
export class PizzeriaService {
    // URL de la API
    static pizzaURL = 'https://pizza-rest-server-production.up.railway.app/api/pizzeria/pizzes';

    /**
     * Funció per a obtindre les pizzes de la API
     * @returns {Promise<Array>}
     */
    static async getPizza() {
        try {
            // Fem el fetch
            let resposta = await fetch(this.pizzaURL);

            // Si no pot fer el fetch, torna l'error
            if (!resposta.ok) {
                throw new Error(`Error ${resposta.status}: No s'han pogut carregar les pizzes`);
            }

            // Convertim la resposta a JSON
            const dadesPG = await resposta.json();

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
    static entrantsURL = 'https://pizza-rest-server-production.up.railway.app/api/pizzeria/entrants';

    /**
     * Funció per a obtindre els entrants de la API
     * @returns {Promise<Array>}
     */
    static async getEntrants() {
        try {
            // Fem el fetch
            const resposta = await fetch(this.entrantsURL);

            // Si no pot fer el fetch, torna l'error
            if (!resposta.ok) {
                throw new Error(`Error ${resposta.status}: No s'han pogut carregar els entrants`);
            }

            // Convertim la resposta a JSON
            const dadesPG = await resposta.json();

            // Verifiquem que les dades tenen el format esperat
            if (!dadesPG.records || !Array.isArray(dadesPG.records)) {
                throw new Error('El format de les dades no és vàlid');
            }

            // Llista de pizzes
            return dadesPG.records.map(dada => new Entrants(dada));
        } catch (error) {
            console.error("Error carregant les pizzes:", error.message);
            return []; // Retornem un array buit en cas d'error
        }
    }
    static begudesURL = 'https://pizza-rest-server-production.up.railway.app/api/pizzeria/beguda';
    /**
     * Funció per a obtindre les begudes de l'API
     * @returns {Promise<Array>}
     */
    static async getBeguda() {
        try {
            // Fem el fetch
            const resposta = await fetch(this.begudesURL);

            // Si no pot fer el fetch, torna l'error
            if (!resposta.ok) {
                throw new Error(`Error ${resposta.status}: No s'han pogut carregar els entrants`);
            }

            // Convertim la resposta a JSON
            const dadesPG = await resposta.json();

            // Verifiquem que les dades tenen el format esperat
            if (!dadesPG.records || !Array.isArray(dadesPG.records)) {
                throw new Error('El format de les dades no és vàlid');
            }

            // Llista de begudes
            return dadesPG.records.map(dada => new Entrants(dada));
        } catch (error) {
            console.error("Error carregant les begudes:", error.message);
            return []; // Retornem un array buit en cas d'error
        }
    }
}
