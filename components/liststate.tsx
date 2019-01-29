import React from 'react';
import { StyleSheet, Text, View,
    Button, Modal, TouchableHighlight, Alert } from 'react-native';


type MyProps = {title:String, 
    alfabeto:Array<any>,
    nmbrStates: Number};

type MyState = {modalVisible: boolean};
export default class ListState extends React.Component<MyProps, MyState> {
    constructor(props: any) {
      super(props);
      this.state = {
          modalVisible: false
      };
    }

    setModalVisible(visible:boolean) {
        this.setState({modalVisible: visible});
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title+"   ------>"}</Text>
                <Button title="Transiciones"
                color="#FF2D00"
                onPress={() => {this.setModalVisible(true)}}
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
                    <View style={{marginTop: 22}}>
                      <View>
                        <Text>Hello World!</Text>
                
                        <TouchableHighlight
                          onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                          }}>
                          <Text>Hide Modal</Text>
                        </TouchableHighlight>
                      </View>
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