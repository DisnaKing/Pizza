import {Producte} from "./producte.js"
export class Pizza extends Producte{
    // Constructor per a la classe
    constructor({id, nom, desc, vegetariana,alergens, img, preu}) {
        super({id, nom, img, preu});

        this.desc=desc;
        this.vegetariana=vegetariana;
        this.alergens=alergens;
        this.img=img;
    }

    // Metode toString()
    toString(){
        return `${this.nom}- ${this.preu}`
    }
}