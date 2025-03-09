import {Producte} from "./producte.js"
export class Beguda extends Producte{
    constructor(Begudes){
        super(Begudes)
    }
    toString(){
        return `${this.id} entrants`;
    }
}