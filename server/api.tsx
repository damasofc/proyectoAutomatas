import Automata from '../models/automata';
import firebase from 'react-native-firebase';

export function saveAutomataFB(automata: Automata){
    firebase.database().ref('automatas/'+ getIdAndAdd()).set(JSON.stringify(automata));
}

export function getAutomata(id:number){
    firebase.database().ref('automatas').on("value",snapshot => {
        // let x = new Array(JSON.parse(snapshot.val()));
        // console.log(snapshot.val());
        snapshot.val().forEach((element, i) => {
          console.log(i);
        });
    })
}

function getIdAndAdd(){
    var res = 0;
    let ids = firebase.database().ref('automatas').on("value",snapshot => {
        res = snapshot.numChildren() + 1;
        console.log(snapshot.numChildren());
    })
    return res;
}