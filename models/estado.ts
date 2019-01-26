import Transicion from './transicion';
export default class Estado {
    esFinal:boolean;
    esInicial:boolean;
    nombre:String;
    transiciones:Map<String,Transicion>;
    constructor(nombre:String,fin = false,ini = false) {
        this.nombre = nombre;
        this.esFinal = fin;
        this.esInicial = ini;
        this.transiciones = new Map();
    }
};
