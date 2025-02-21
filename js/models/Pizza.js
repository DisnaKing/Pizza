export class Pizza {
    constructor(ingredients) {
        this.id = ingredients.id;
        this.nom = ingredients.nom;
        this.desc = ingredients.desc;
        this.vegetariana = ingredients.vegetariana;
        this.preu = ingredients.preu;
        this.alergens = ingredients.alergens;
        this.img = ingredients.img;
    }
    toString(){
        return `${this.nom}- ${this.preu}`
    }
}