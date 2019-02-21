import Estado from './estado';
import { objectToMap } from '../server/api';
import Transicion from './transicion';
export default class Automata {
    idName: String
    estados:Map<Number,Estado>;
    constructor(obj: any,name:String = '') {
        if(obj != null){
            this.idName = obj.idName;
            this.estados = new Map();
            this.createStatesFromData(obj);
            this.createTransitions(obj);
        }else{
            this.estados = new Map();
            this.idName = name
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
                this.estados.get(obej.nombre).transiciones.set(transi.val,new Transicion(this.estados.get(transi.init),this.estados.get(transi.end)));
            }
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

    convertAutomata2String(){
        let lo = {
            idName: this.idName,
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
        var x = 0;
        var state:any = this.getInitialState();
        var char = palabra.charAt(x);
        while (char.length > 0 && state != null) {
            state = this.getNextState(state,char);
            console.log(char+" -----> "+state.idNombre);
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

