import Estado from './estado';
export default class Automata {
    estados:Map<Number,Estado>;
    constructor() {
        this.estados = new Map();
    }

    getInitialState():Estado {
        this.estados.forEach(element => {
            if(element.esInicial)
                return element;
        });
        return new Estado("null");
    }

    evaluar(palabra: String): boolean{
        var x = 0;
        var state:any = this.getInitialState();
        var char = palabra.charAt(x);
        while (char != null) {
            state = this.getNextState(state,char);
            if(state == null)
            {
                return false;
            }
            x++;
            char = palabra.charAt(x);
        }
        if(state.esFinal){
            return true;
        }
        return false;
    }

    getNextState(actual:Estado,char:String){
        var nxState = actual.transiciones.get(char);
        if(nxState != null){
            return nxState;
        }
        return null;
    }
};

