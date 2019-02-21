import Transicion from './transicion';
import { mapToObjectRec, objectToMap } from '../server/api';
import {parse, stringify} from 'flatted/esm';
export default class Estado {
    esFinal:boolean;
    esInicial:boolean;
    idNombre:number;
    transiciones:Map<String,Transicion>;
    constructor(idnombre:number = 0,fin = false,ini = false) {
            this.idNombre = idnombre;
            this.esFinal = fin;
            this.esInicial = ini;
            this.transiciones = new Map();
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
