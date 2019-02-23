import Transicion from './transicion';
export default class Estado {
    esFinal:boolean;
    esInicial:boolean;
    idNombre:number;
    transiciones:Map<String,Transicion>;
    posX:number;
    posY:number;
    constructor(idnombre:number = 0,fin = false,ini = false) {
            this.idNombre = idnombre;
            this.esFinal = fin;
            this.esInicial = ini;
            this.transiciones = new Map();
            this.posX = 0;
            this.posY = 0;
    }

    convertEstado2Json(){
        let lo = {
            nombre: this.idNombre,
            esFinal: this.esFinal,
            esInicial: this.esInicial,
            transiciones: this.convertTransiciones(this.transiciones)
        }
        return lo;

    }

    convertTransiciones(m:Map<any,any>){
        let lo = []
        let index = 0;
        for(let[k,v] of m) {
            lo[index] = {
                val: k,
                init: v.stStart.idNombre,
                end: v.stEnd.idNombre
            }
            index++;
        }
        return lo;
    }
};
