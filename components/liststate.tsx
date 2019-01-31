import React from 'react';
import { CheckBox } from 'react-native-elements'
import { StyleSheet, Text, View,Picker, ScrollView,
    Button, Modal, TouchableHighlight, Alert } from 'react-native';
import Transicion from '../models/transicion';


type MyProps = {title:String, 
    alfabeto:Array<any>,
    id: number,
    nmbrStates: Number,
    guardarData: any};

type MyState = {modalVisible: boolean,transiciones:Map<String,String>, isFinal:boolean};
export default class ListState extends React.Component<MyProps, MyState> {
    constructor(props: any) {
      super(props);
      this.state = {
          modalVisible: false,
          transiciones: new Map(),
          isFinal: false
      };
      this.props.guardarData(this.props.id,this.state.transiciones,this.state.isFinal);
    }

    componentDidUpdate(prevProps:any){
        if(prevProps.alfabeto !== this.props.alfabeto){
            let st = this.state.transiciones;
            this.props.alfabeto.forEach(v => {
                if(v.length > 0){
                    st.set(v,"Q0");
                }
            });
            this.setState({transiciones: st});

        }
    }

    setModalVisible(visible:boolean) {
        this.setState({modalVisible: visible});
    }

    statesAut(){
        var x:Array<any> =  new Array();
            for (let index = 0; index < this.props.nmbrStates; index++) {
                x.push(<Picker.Item  key={"q"+index} label={"Q"+(index)} value={"Q"+index} />);    
            }
        return x;
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title+"   ------>"}</Text>
                <CheckBox
                    title='Es Final'
                    checked={this.state.isFinal}
                    onPress={() => {
                        this.setState({isFinal: !this.state.isFinal});
                        this.props.guardarData(this.props.id,this.state.transiciones,!this.state.isFinal);
                    }}
                />
                <Button title="Transiciones"
                color="#FF2D00"
                onPress={() => {
                    this.setModalVisible(true);
                    console.log(this.props.nmbrStates);
                }}
                />

                <Modal
                    animationType="fade"
                    transparent={false}
                    presentationStyle="pageSheet"
                    style={styles.modal}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22, flex: 1,flexDirection: 'column'}}>
                        <View>
                            <Text style={styles.title}>{"Transiciones de "+this.props.title}</Text>
                        </View>
                        <ScrollView style={{flex:1, flexDirection: 'column', margin:10}}>
                        {this.props.alfabeto.map((v,i) => {
                            return (
                                    <View key={v+i} style={{flex:1, flexDirection: 'row'}}>
                                        <Text style={styles.subTitle}>{v}</Text>
                                        <Picker
                                            selectedValue={this.state.transiciones.get(v)}
                                            style={{height: 50, width: 100}}
                                            onValueChange={(itemValue, itemIndex) => {
                                                let x = this.state.transiciones;
                                                x.set(v,itemValue);
                                                this.setState({transiciones: x});
                                            }}>
                                            {this.statesAut()}
                                        </Picker>
                                    </View>
                                )
                        })}
                        </ScrollView>
                
                        <Button
                            title="Hide Modal"
                          onPress={() => {
                            this.props.guardarData(this.props.id,this.state.transiciones,this.state.isFinal);
                            this.setModalVisible(!this.state.modalVisible);
                          }}>
                        </Button>
                    </View>
                </Modal>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    subTitle: {
        fontSize: 15,
        textAlign: 'left',
        color: 'black',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    modal: {
        backgroundColor: 'white',
        margin: 15, // This is the important style you need to set
        alignItems: undefined,
        justifyContent: undefined,
      }
});