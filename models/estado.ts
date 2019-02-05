import Transicion from './transicion';
import { mapToObjectRec, objectToMap } from '../server/api';
import {parse, stringify} from 'flatted/esm';
export default class Estado {
    esFinal:boolean;
    esInicial:boolean;
    nombre:String;
    transiciones:Map<String,Transicion>;
    constructor(nombre:String = '',fin = false,ini = false) {
            this.nombre = nombre;
            this.esFinal = fin;
            this.esInicial = ini;
            this.transiciones = new Map();
    }

    setTransiciones(obj:any){
        this.transiciones = new Map(obj);
    }

    convertEstado2String(){
        let lo = {
            nombre: this.nombre,
            esFinal: this.esFinal,
            esInicial: this.esInicial,
            transiciones: mapToObjectRec(this.transiciones)
        }
        return stringify(lo);

    }
    convertEstado2Json(){
        let lo = {
            nombre: this.nombre,
            esFinal: this.esFinal,
            esInicial: this.esInicial,
            transiciones: mapToObjectRec(this.transiciones)
        }
        return lo;

    }
};
