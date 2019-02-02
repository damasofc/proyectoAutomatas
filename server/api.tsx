import Automata from '../models/automata';
import firebase from 'react-native-firebase';

export function saveAutomataFB(automata: Automata){
    firebase.database().ref('automatas/').push(JSON.stringify(automata));
}

export function getAutomata(id:number,callback:any){
    var res = 0;
    firebase.database().ref('automatas').on('value',snapshot => {
        snapshot.forEach((element, i) => {
            if(id == res){
                let x = new Automata(JSON.parse(snapshot.val()));
                callback(x);
                return;
            }
            res++;
        });
    });
    callback(null);
}