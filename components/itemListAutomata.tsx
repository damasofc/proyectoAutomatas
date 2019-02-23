import React from 'react';
import { StyleSheet, Platform,
   Image, Text, View, ScrollView, TouchableOpacity,
   Dimensions, Picker, TextInput, Button, ToastAndroid} from 'react-native';
import Modal from "react-native-modal";
import Automata from '../models/automata';
import { getAutomata } from '../server/api';
import AutomatShow from './automataShow';

type MyProps = {
    id:number,
    name:string,
    tipo:string
};

type MyState = {modalVisible:boolean,automat:any,palabra:string,automataVisible:boolean};
export default class ItemList extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
      automataVisible:false,
      automat: null,
      palabra: ''
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.evaluarAutomata = this.evaluarAutomata.bind(this);
    this.setAutomataVisible = this.setAutomataVisible.bind(this);
    this.showAutomata = this.showAutomata.bind(this);
  }

  showAutomata(){
    if(this.state.automat == null){
      getAutomata(this.props.id,(data: any) => {
        this.setState({automat: data});
      })
    }
  }

  setModalVisible(visible:boolean) {
    this.setState({modalVisible: visible});
  }

  setAutomataVisible(visible:boolean){
    this.setState({automataVisible: visible});
  }

  evaluarAutomata(){
    if(this.state.automat == null){
      getAutomata(this.props.id,(data: any) => {
        this.setState({automat: data});
        if(this.state.automat.evaluar(this.state.palabra)){
          ToastAndroid.show("Palabara Aceptada!!",ToastAndroid.LONG);
        }else{
          ToastAndroid.show("Palabara NO Aceptada!!",ToastAndroid.LONG);
        }
      })
    }else{
      if(this.state.automat.evaluar(this.state.palabra)){
        ToastAndroid.show("Palabara Aceptada!!",ToastAndroid.LONG);
      }else{
        ToastAndroid.show("Palabara NO Aceptada!!",ToastAndroid.LONG);
      }
    }
  }


  componentDidMount(){
      
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.number}>{(this.props.id+1) + "."}</Text>
            <Text style={styles.name}>{this.props.name}</Text>
          </View>
          <View>
            <Button title="Mostrar"
                color="#841421"
                onPress={() => {
                    this.setAutomataVisible(true);
                }}
            />
            <Button title="Evaluar"
                color="#008000"
                onPress={() => {
                  this.setModalVisible(true);
                }}
            />
          </View>
          <Modal
            isVisible={this.state.automataVisible}
            onRequestClose={() => { console.log("Sali"); } }>
            {this.showAutomata()}
              <View>
                <AutomatShow automata={this.state.automat}/>
                <Button title={"Cerrar"} onPress={() =>this.setAutomataVisible(false)} />
              </View>
          </Modal>
          <Modal
            isVisible={this.state.modalVisible}
            onRequestClose={() => { console.log("Sali"); } }>
              <View style={{
                 flex: 1,
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center'}}>

              <View style={{
                  justifyContent: 'center',
                  backgroundColor: 'white',
                   width: 300,
                   height: 300}}>
                  <Text>Escriba la Palabra: </Text>
                  <TextInput
                    selectedValue={this.state.palabra}
                    placeholder="Escriba la palabra a evaluar"
                    onChangeText={(text:string) => {
                      this.setState({
                        palabra:text
                      });
                    }}
                    value={this.state.palabra}
                  />
                  <Button title={"Evaluar"} onPress={() =>this.evaluarAutomata()} />
                  <Button title={"Cerrar"} onPress={() =>this.setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10,
    flexDirection: 'row',
  },
  number: {
    fontSize: 20,
    color:'red'
    
  },
  name: {
    fontSize: 15,
    fontWeight: 'normal',
    
  }
});
