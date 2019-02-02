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

import NavBar from './navbar';
import { saveAutomataFB, getAutomata } from '../server/api';

type MyProps = {};

type MyState = {};
export default class ListaAutomatas extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {

    };

  }



  componentDidMount(){
      
  }

  render() {
    return (
        <View style={{flex:1}}>
            <NavBar title={"Lista de Automatas"}/>
            <ScrollView style={styles.container}>
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
