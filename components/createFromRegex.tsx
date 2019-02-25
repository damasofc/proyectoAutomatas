import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import NavBar from './navbar';
import Automata from '../models/automata';
import Estado from '../models/estado';
var regParser = require('automata.js');

type MyProps = {};

type MyState = {regex:string};

export class CreateFromRegex extends React.Component<MyProps, MyState> {
    constructor(props:any) {
      super(props)
    
      this.state = {
         regex:''
      }
    }

    convert2DFA(data:any){
        var estadoIni = data.initialState;
        var acceptances = new Array<Boolean>(data.numOfStates);
        for (let i = 0; i < data.numOfStates; i++) {
            acceptances[i] = false;
        }
        
        var x:Automata = new Automata(null,this.state.regex,0);
        for (let index = 0; index < data.numOfStates; index++) {
            x.estados.set(index,new Estado(index,))
            
        }
    }
    
  render() {
    return (
      <View style={{flex:1}}>
            <NavBar title={"Regex -> DFA"}/>
            <View style={{flex:1, flexDirection:'row'}}>
                <Text style={{fontSize:20,color:'black'}}>INGRESE LA ER: </Text>
                <TextInput
                    style={{fontSize:15}}
                    value={this.state.regex}
                    placeholder="Escriba su ER"
                    onChangeText={(text:string) => {
                        this.setState({
                            regex: text
                        })
                    }}

                />

            </View>
            <Button title="Convertir"
                color="#812340"
                onPress={() => {
                    var parser = new regParser.RegParser(this.state.regex);
                    var dfa = parser.parseToDFA();
                    console.log(dfa);
                }}
            />
      </View>
    )
  }
}

export default CreateFromRegex
