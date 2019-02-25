import Estado from './estado';
import Transicion from './transicion';
export default class Automata {
    idName: String;
    tipo:number;//0 == DFA, 1 == NFA, 2 == NFA-e
    estados:Map<Number,Estado>;
    constructor(obj: any,name:String = '',tipo:number) {
        if(obj != null){
            this.idName = obj.idName;
            this.estados = new Map();
            this.tipo = obj.tipo;
            this.createStatesFromData(obj);
            this.createTransitions(obj);
        }else{
            this.estados = new Map();
            this.idName = name;
            this.tipo = tipo;
        }
    }

    createStatesFromData(data:any){
        for (let index = 0; index < data.estados.length; index++) {
            let obej = data.estados[index];
            this.estados.set(obej.nombre,new Estado(obej.nombre,obej.esFinal,obej.esInicial));
        }
    }

    createTransitions(data:any){
        for (let index = 0; index < data.estados.length; index++) {
            let obej = data.estados[index];
            for(let m = 0; m < obej.transiciones.length;m++){
                let transi = obej.transiciones[m];
                this.estados.get(obej.nombre).transiciones.set(transi.val,this.getArrTransiciones(transi.transiciones));
            }
        }
    }

    getArrTransiciones(m:Array<any>){
        var arrTransi = new Array<Transicion>();
        for(let transi of m){
            arrTransi.push(new Transicion(this.estados.get(transi.init),this.estados.get(transi.end)));
        }
        return arrTransi;
    }

    getInitialState() {
        var estado = null;
        this.estados.forEach((elem:Estado, key:Number) => {
            if(elem.esInicial)
                estado = elem;
        });
        return estado;
    }

    convertAutomata2String(){
        let lo = {
            idName: this.idName,
            tipo: this.tipo,
            estados: this.convertStates2Json(this.estados)
        }
        return JSON.stringify(lo);
    }

    convertStates2Json(m:Map<any,any>){
        let lo = []
        for(let[k,v] of m) {
            lo[k] = v.convertEstado2Json();
        }
        return lo;
    }

    evaluar(palabra: String): boolean{
        var res = false;
        switch (this.tipo) {
            case 0:
                res = this.evaluarDFA(palabra);
                break;
            default:
                res = this.evaluarNFA(palabra);
                break;
        }
        return res;
    }

    evaluarNFA(palabra:String):boolean{
        var state:any = this.getInitialState();
        return this.evalNFA(state,palabra,0);
    }

    evalNFA(actual:Estado,palabra:String,posChar:number){
        console.log(posChar);
        if(posChar >= palabra.length){
            if(actual.esFinal){
                return true;
            }else{
                return false;
            }
        }else{
            let temp = actual.transiciones.get(palabra[posChar]);
            if(temp != null){
                for(let transiActual of temp){
                    if(this.evalNFA(transiActual.stEnd,palabra,(posChar+1))){
                        return true;
                    }
                }
            }
            return false;
        }
    }

    evaluarDFA(palabra:String):boolean{
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
            return nxState[0].stEnd;
        }
        return null;
    }
};

