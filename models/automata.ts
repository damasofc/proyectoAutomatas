import Estado from './estado';
export default class Automata {
    estados:Map<Number,Estado>;
    constructor() {
        this.estados = new Map();
    }

    getInitialState() {
        var estado:any = null;
        this.estados.forEach((elem:Estado, key:Number)  => {
            if(elem.esInicial === true){
                estado = elem;
            }
        });
        return estado;
    }

    evaluar(palabra: String): boolean{
        var x = 0;
        var state:any = this.getInitialState();
        var char = palabra.charAt(x);
        while (char.length > 0) {
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
        var trans = actual.transiciones.get(char);
        if(trans!= null){
            return trans.stEnd;
        }
        return null;
    }
};

