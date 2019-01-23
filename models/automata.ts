import Estado from './estado';
import Transicion from './transicion';
export default class Automata {
    estados:Array<Estado>;
    transiciones:Array<Transicion>;
    constructor(params:any) {
        this.estados = new Array();
        this.transiciones = new Array();
    }

    getInitialState() {
        this.estados.forEach(element => {
            if(element.esInicial)
                return element;
        });
    }
};

