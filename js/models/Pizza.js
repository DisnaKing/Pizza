export class Pizza {
    // Constructor per a la classe
    constructor(ingredients) {
        this.id = ingredients.id;
        this.nom = ingredients.nom;
        this.desc = ingredients.desc;
        this.vegetariana = ingredients.vegetariana;
        this.preu = ingredients.preu;
        this.alergens = ingredients.alergens;
        this.img = ingredients.img;
    }

    // Metode toString()
    toString(){
        return `${this.nom}- ${this.preu}`
    }
}