import Automata from '../models/automata';
import firebase from 'react-native-firebase';
export function saveAutomataFB(automata: Automata){
    firebase.database().ref('automatas/').push(automata.convertAutomata2String());

}

var BreakException ={};

export  async function getAutomata(id:number,callback:any){
    var res = 0;
    firebase.database().ref('automatas').on('value',snapshot => {
        snapshot.forEach((element, i) => {
            if(id == res){
                var x = new Automata(JSON.parse(element._value));
                callback(x);
            }
            res++;
        });
    });
}

export  async function getAutomatasList(callback:any){
    var res:Array<any> = [];
    var conta = 0;
    firebase.database().ref('automatas').on('value',snapshot => {
        snapshot.forEach((element, i) => {
                var x = JSON.parse(element._value);
                res.push({id: conta,name: x.idName});
                conta++;
        });    
        callback(res);
    });
}