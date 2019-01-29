import React from 'react';
import { StyleSheet, Platform,
   Image, Text, View, ScrollView, 
   Dimensions, Picker, TextInput, Button } from 'react-native';
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

type MyProps = {};

type MyState = {numbrStates: Number, alfabeto: Array<String>, alfabetoString: String};
export default class NuevoAutomata extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      numbrStates: 1,
      alfabeto: [],
      alfabetoString: ''
    };
  }

  getListItems(){
    var x:Array<any> =  new Array();
    for (let index = 0; index < this.state.numbrStates; index++) {
      x.push(<ListState key={"q"+index} title={"Q"+(index)} alfabeto={this.state.alfabeto} />);
      
    }
    return x;
  }

  componentDidMount(){
      var x:Automata = new Automata();
      x.estados.set(0,new Estado("q0",true,true));
      x.estados.set(1,new Estado("q1"));
      x.estados.set(2,new Estado("q2"));
      x.estados.set(3,new Estado("q3"));
      x.estados.get(0).transiciones.set('1',new Transicion(x.estados.get(0),x.estados.get(1)));
      x.estados.get(0).transiciones.set('0',new Transicion(x.estados.get(0),x.estados.get(2)));
      x.estados.get(1).transiciones.set('1',new Transicion(x.estados.get(1),x.estados.get(0)));
      x.estados.get(1).transiciones.set('0',new Transicion(x.estados.get(1),x.estados.get(3)));
      x.estados.get(3).transiciones.set('0',new Transicion(x.estados.get(3),x.estados.get(1)));
      x.estados.get(3).transiciones.set('1',new Transicion(x.estados.get(3),x.estados.get(2)));
      x.estados.get(2).transiciones.set('0',new Transicion(x.estados.get(2),x.estados.get(0)));
      x.estados.get(2).transiciones.set('1',new Transicion(x.estados.get(2),x.estados.get(3)));
      console.log(x.evaluar("001111"));
  }

  render() {
    let numbersSt = "1 2 3 4 5 6 7 8 9 10".split(' ').map((s,i) => {
      return <Picker.Item key={i} value={s} label={s} />
    })
    return (
        <View style={{flex:1}}>
            <NavBar title={"Crear Nuevo Automata"}/>
            <ScrollView style={styles.container}>
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
            <View style={{flex: 1, flexDirection: 'column',}}>
              <Text style={styles.textB}>Estados: </Text>
              {this.getListItems()}
            
            </View>
            <View style={{flex: 1, flexDirection: 'column',}}>
              <Button title="Crear"
                color="#841584"
                onPress={() => {
                  console.log(this.state.alfabeto);

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
