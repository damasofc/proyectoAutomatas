import React from 'react';
import { StyleSheet, Platform,
   Image, Text, View, ScrollView, 
   Dimensions, Picker, TextInput, Button, ToastAndroid } from 'react-native';
import "json-circular-stringify";
import Svg, {
  Line,
  Rect,
  Circle
} from 'react-native-svg';

import firebase from 'react-native-firebase';
import {Provider, Toast, TabBar, Icon } from '@ant-design/react-native';
import Automata from '../models/automata';
import Estado from '../models/estado';
import Transicion from '../models/transicion';
import NavBar from './navbar';
import ListState from './liststate';
import { saveAutomataFB, getAutomata } from '../server/api';

type MyProps = {};

type MyState = {numbrStates: Number, alfabeto: Array<String>,automataName:String, 
  alfabetoString: String,estadoIni:String,estados:Map<number,any>,estadosFinales:Array<any>};
export default class NuevoAutomata extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      numbrStates: 2,
      alfabeto: [],
      alfabetoString: '',
      estadoIni: 'Q0',
      estadosFinales: new Array(),
      estados: new Map(),
      automataName: ''
    };
    this.saveTransiciones=this.saveTransiciones.bind(this);
  }

  getListItems(){
    var x:Array<any> =  new Array();
    for (let index = 0; index < this.state.numbrStates; index++) {
      x.push(<ListState id={index} guardarData={this.saveTransiciones} nmbrStates={this.state.numbrStates} key={"q"+index} title={"Q"+(index)} alfabeto={this.state.alfabeto} />);
      
    }
    return x;
  }

  saveTransiciones(id:number,transiciones:Map<String,String>,isFinal:boolean){
    let st = this.state.estados;
    st.set(id,transiciones);
    if(isFinal){
      let estadosFin = this.state.estadosFinales;
      estadosFin[id] = true;
      this.setState({estados: st, estadosFinales:estadosFin});
    }
    else{
      let estadosFin = this.state.estadosFinales;
      estadosFin[id] = false;
      this.setState({estados: st, estadosFinales:estadosFin});
    }
  }

  getEstados(){
    var x:Array<any> =  new Array();
    for (let index = 0; index < this.state.numbrStates; index++) {
      x.push(<Picker.Item key={"q"+index} label={"Q"+(index)} value={"Q"+(index)} />);
      
    }
    return x;
  }

  hasFinalState(){
    var res = false;
    this.state.estadosFinales.forEach((v,i) => {
      if(v === true){
        res = true;
      }
    })
    return res;
  }

  hasAlphabet(){
    var res = false;
    this.state.alfabeto.forEach((v,i) => {
      if(v.length > 0){
        res = true;
      }
    })
    return res;
  }

  isInitialState(id:number){
    var x = Number(this.state.estadoIni[1]);
    if(id == x){
      return true;
    }
    return false;
  }

  getIdFromName(estado:String){
    var x = Number(estado[1]);
    return x;
  }

  guardarAutomata(){
    if(this.hasAlphabet() && this.hasFinalState() && this.state.automataName.length > 0){
      //TODO:DONDE ESTA EL 0 debo editarlo por el tipo si es dfa, nfa
      var x:Automata = new Automata(null,this.state.automataName,0);
      this.state.estados.forEach((value:any, key:number) => {
        x.estados.set(key,new Estado(key,this.state.estadosFinales[key],this.isInitialState(key)));
      });
      //guardar transiciones
      this.state.estados.forEach((value:any, key:number) => {
        value.forEach((valueVal:String, keyVal:String) => {
          let transi = Array<Transicion>();
          transi.push(new Transicion(x.estados.get(key),x.estados.get(this.getIdFromName(valueVal))));
          x.estados.get(key).transiciones.set(keyVal,transi);
        })
      });
      saveAutomataFB(x);
      ToastAndroid.show('Automata guardado', ToastAndroid.LONG);
    }
    else{
      ToastAndroid.showWithGravity(
        'Hace falta el alfabeto, el nombre del automata o seleccionar al menos un estado final',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      
    }
  }

  render() {
    let numbersSt = "1 2 3 4 5 6 7 8 9 10".split(' ').map((s,i) => {
      return <Picker.Item key={i} value={s} label={s} />
    })
    return (
        <View style={{flex:1}}>
            <NavBar title={"Crear Nuevo Automata"}/>
            <ScrollView style={styles.container}>
            <View style={{flex: 1, flexDirection: 'row',}}>
              <Text>Nombre identificador del Automata: </Text>
              <TextInput
                selectedValue={this.state.automataName}
                placeholder="Escriba el nombre del Automata"
                onChangeText={(text:String) => {
                  this.setState({
                    automataName:text
                  });
                }}
                value={this.state.automataName}
              />
            
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text>Estados: </Text>
              <Picker
                selectedValue={this.state.numbrStates.toString()}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({numbrStates: +itemValue})
                }>
                {numbersSt}
              </Picker>
            
            </View>
            <View style={{flex: 1, flexDirection: 'row',}}>
              <Text>Alfabeto: </Text>
              <TextInput
                selectedValue={this.state.numbrStates.toString()}
                placeholder="Escriba los simbolos separados por una ','"
                onChangeText={(text:String) => {
                  this.setState({
                    alfabetoString: text,
                    alfabeto: text.split(',')
                  });
                }}
                value={this.state.alfabetoString}
              />
            
            </View>
            <View style={{flex: 1, flexDirection: 'row',}}>
              <Text>Estado Inicial: </Text>
              <Picker
                selectedValue={this.state.estadoIni}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({estadoIni: itemValue})
                }>
                {this.getEstados()}
              </Picker>
            
            </View>
            <View style={{flex: 1, flexDirection: 'column',}}>
              <Text style={styles.textB}>Estados: </Text>
              {this.getListItems()}
            
            </View>
            <View style={{flex: 1, flexDirection: 'column',}}>
              <Button title="Crear"
                color="#841584"
                onPress={() => {
                  this.guardarAutomata();
                }}
              />
            
            </View>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10
  },
  textB: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
