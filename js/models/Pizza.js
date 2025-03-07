import {Producte} from "./producte.js"
export class Pizza extends Producte{
    // Constructor per a la classe
    constructor(ingredients) {
        super(ingredients);
        this.desc = ingredients.desc;
        this.vegetariana = ingredients.vegetariana;
        this.alergens = ingredients.alergens;
    }

    // Metode toString()
    toString(){
        return `${this.nom}- ${this.preu}`
    }
}