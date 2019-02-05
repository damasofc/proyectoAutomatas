import Automata from '../models/automata';
import firebase from 'react-native-firebase';
import {parse, stringify} from 'flatted/esm';
export function saveAutomataFB(automata: Automata){
    firebase.database().ref('automatas/').push(automata.convertAutomata2String());

}

var BreakException ={};

export  async function getAutomata(id:number,callback:any){
    var res = 0;
    firebase.database().ref('automatas').on('value',snapshot => {
        snapshot.forEach((element, i) => {
            if(id == res){
                // console.log(parse(element._value).estados.length);
                // console.log(Object.keys(parse(element._value).estados).length);
                // console.log(parse(element._value).estados[0]);
                var x = new Automata(parse(element._value));
                callback(x);
                throw BreakException;
            }
            res++;
        });
    });
}

export function mapToObjectRec(m:Map<any,any>) {
    let lo = {}
    for(let[k,v] of m) {
        if(v instanceof Map) {
            lo[k] = mapToObjectRec(v)
        }
        else {
            lo[k] = v
        }
    }
    return lo
}

export function objectToMap(o:any) {
    let m = new Map()
    for(let k of Object.keys(o)) {
        if(o[k] instanceof Object) {
            m.set(k, objectToMap(o[k]))   
        }
        else {
            m.set(k, o[k])
        }    
    }
    return m
}