import React from 'react';
import { StyleSheet, Platform,
   Image, Text, View, ScrollView, 
   Dimensions, Picker, TextInput, Button, ToastAndroid, Modal } from 'react-native';
import "json-circular-stringify";
import Svg, {
  Line,
  Rect,
  Circle
} from 'react-native-svg';

import firebase from 'react-native-firebase';

import NavBar from './navbar';
import { saveAutomataFB, getAutomata, getAutomatasList } from '../server/api';
import ItemList from './itemListAutomata';

type MyProps = {};

type MyState = {automatas: Array<any>};
export default class ListaAutomatas extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      automatas: []
    };

  }

  componentDidMount(){
      getAutomatasList((data:any) => {
        this.setState({
          automatas: data.reverse()
        })
      })


  }

  render() {
    return (
        <View style={{flex:1}}>
            <NavBar title={"Lista de Automatas"}/>
            <ScrollView style={styles.container}>
            {this.state.automatas.map((val,i) => {
              return(<ItemList id={val.id} key={val.id} name={val.name} tipo={"s"}/>)
            })}
            </ScrollView>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:5
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
