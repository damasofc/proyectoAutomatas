import Estado from './estado';
import {parse, stringify} from 'flatted/esm';
import { objectToMap } from '../server/api';
export default class Automata {
    idName: String
    estados:Map<Number,Estado>;
    constructor(obj: any,name:String = '') {
        if(obj != null){
            this.idName = obj.idName;
            this.estados = new Map();
            for (let index = 0; index < Object.keys(obj.estados).length; index++) {
                let obej = obj.estados[index];
                this.estados.set(index,new Estado(
                    obej.nombre,obej.esFinal,obej.esInicial));
            }
            for (let index = 0; index < Object.keys(obj.estados).length; index++) {
                for (let m = 0; m < Object.keys(obj.estados[index].transiciones).length; index++){
                    this.estados.get(index)

                }
            }
        }else{
            this.estados = new Map();
            this.idName = name
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
        return stringify(lo);
    }

    convertStates2Json(m:Map<any,any>){
        let lo = {}
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

