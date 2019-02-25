import Transicion from './transicion';
export default class Estado {
    esFinal:boolean;
    esInicial:boolean;
    idNombre:number;
    transiciones:Map<String,Array<Transicion>>;
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
            tipo: this.tipo,
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
            let transi = new Array<any>();
            for(let it of v){
                transi.push({
                    val:k,
                    init: it.stStart.idNombre,
                    end: it.stEnd.idNombre
                });
            }
            lo[index] = {
                val: k,
                transiciones: transi
            }
            index++;
        }
        return lo;
    }
};
