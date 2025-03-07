import {Producte} from "./producte.js"
export class Entrants extends Producte{
    constructor(Entrants){
        super(Entrants)
    }
    toString(){
        return `${this.id} entrants`;
    }
}