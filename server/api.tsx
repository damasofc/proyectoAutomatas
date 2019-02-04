import Automata from '../models/automata';
import firebase from 'react-native-firebase';
import {parse, stringify} from 'flatted/esm';
export function saveAutomataFB(automata: Automata){
    firebase.database().ref('automatas/').push(stringify(automata));
    console.log(stringify(automata));
}

var BreakException ={};

export  async function getAutomata(id:number,callback:any){
    var res = 0;
    firebase.database().ref('automatas').on('value',snapshot => {
        snapshot.forEach((element, i) => {
            if(id == res){
                var x = new Automata(parse(element._value));
                callback(x);
                throw BreakException;
            }
            res++;
        });
    });
}