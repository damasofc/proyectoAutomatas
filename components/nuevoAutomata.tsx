import React from 'react';
import { StyleSheet, Platform,
   Image, Text, View, ScrollView, 
   Dimensions, Picker } from 'react-native';
import Svg, {
  Line,
  Rect,
  Circle
} from 'react-native-svg';

import firebase from 'react-native-firebase';
import { Button, Provider, Toast, TabBar, Icon } from '@ant-design/react-native';
import Automata from '../models/automata';
import Estado from '../models/estado';
import Transicion from '../models/transicion';

type MyProps = {};

type MyState = {language: any, services: any};
export default class NuevoAutomata extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      language: "Java",
      services: ['one','two']
    };
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
    let numbersSt = this.state.services.map((s,i) => {
      return <Picker.Item key={i} value={s} label={s} />
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <Text style={{ margin: 50 }}>Crear un Nuevo Automata:</Text>
            <View style={{flex: 1, flexDirection: 'row',}}>
              <Text>Estados: </Text>
              <Picker
                selectedValue={this.state.language}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }>
                {numbersSt}
              </Picker>
            
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
