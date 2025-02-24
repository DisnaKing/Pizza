export class Entrants {
    constructor(Entrants){
        this.id = Entrants.id;
        this.preu = Entrants.preu;
        this.nom = Entrants.nom;
        this.img = Entrants.img;
    }
    toString(){
        return `${this.id} entrants`;
    }
}