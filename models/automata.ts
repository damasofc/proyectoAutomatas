import Estado from './estado';
export default class Automata {
    estados:Map<Number,Estado>;
    constructor(obj: any) {
        if(obj != null){
            this.estados = new Map(obj.estados._mapData);
        }else{
            this.estados = new Map();
        }
    }

    getInitialState() {
        var estado = null;
        this.estados.forEach((elem:Estado, key:Number) => {
            if(elem.esInicial)
                estado = elem;
        });
        return estado;
    }

    evaluar(palabra: String): boolean{
        var x = 0;
        var state:any = this.getInitialState();
        var char = palabra.charAt(x);
        while (char.length > 0 && state != null) {
            state = this.getNextState(state,char);
            if(state == null)
            {
                return false;
            }
            x++;
            char = palabra.charAt(x);
        }
        if(state != null && state.esFinal){
            return true;
        }
        return false;
    }

    getNextState(actual:Estado,char:String){
        var nxState = actual.transiciones.get(char);
        if(nxState != null){
            return nxState.stEnd;
        }
        return null;
    }
};

