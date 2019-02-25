import React from 'react';
import { CheckBox } from 'react-native-elements'
import { StyleSheet, Text, View,Picker, ScrollView,
    Button, Modal, TouchableHighlight, Alert } from 'react-native';
import Transicion from '../models/transicion';


type MyProps = {title:String, 
    alfabeto:Array<any>,
    id: number,
    nmbrStates: Number,
    tipoAuto: number,
    guardarData: any};

type MyState = {modalVisible: boolean,transiciones:Map<String,Array<String>>, isFinal:boolean};
export default class ListState extends React.Component<MyProps, MyState> {
    constructor(props: any) {
      super(props);
      this.state = {
          modalVisible: false,
          transiciones: new Map<String,Array<String>>(),
          isFinal: false
      };
      this.addTransicion = this.addTransicion.bind(this);
      this.props.guardarData(this.props.id,this.state.transiciones,this.state.isFinal);
    }
    componentDidUpdate(prevProps:any){
        if(prevProps.alfabeto !== this.props.alfabeto){
            let st = this.state.transiciones;
            this.props.alfabeto.forEach(v => {
                if(v.length > 0){
                    let arr = new Array<String>();
                    arr.push(this.props.title);
                    st.set(v,arr);
                }
            });
            this.setState({transiciones: st});

        }
    }

    componentDidMount(){
        let st = this.state.transiciones;
        this.props.alfabeto.forEach(v => {
            if(v.length > 0){
                let arr = new Array<String>();
                arr.push(this.props.title);
                st.set(v,arr);
            }
        });
        this.setState({transiciones: st});
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

    addTransicion(v:any){
        console.log("hol desde add transicion");
        let temp = this.state.transiciones;
        if(temp != null){
            let temp2 = temp.get(v);
            if(temp2 != null){
                temp2.push(this.props.title);
                temp.set(v,temp2);
            }
        }
        this.setState({transiciones:temp});
    }

    getTransicionesOf(v:any){
        var temp = this.state.transiciones.get(v);
        var res = Array<any>();
        if(temp != null){
            temp.map((nameSt, id) => {
            res.push(<Picker key={id}
                selectedValue={this.state.transiciones.get(v)== null?1:this.state.transiciones.get(v)[id]}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) => {
                    let x = this.state.transiciones;
                    let arr = this.state.transiciones.get(v);
                    arr[id] = itemValue;
                    x.set(v,arr);
                    this.setState({transiciones: x});
                }}>
                {this.statesAut()}
            </Picker>);
            })
            return res;
        }
        return null;
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
                                        <View style={{flex:1, flexDirection: 'column'}}>
                                            {this.getTransicionesOf(v)}
                                            {this.props.tipoAuto > 0? <Button
                                            onPress={() => this.addTransicion(v)}
                                            title={"Add - "+v}
                                            color="#00FF00"
                                            />:null}
                                        </View>
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