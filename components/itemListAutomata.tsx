import React from 'react';
import { StyleSheet, Platform,
   Image, Text, View, ScrollView, 
   Dimensions, Picker, TextInput, Button, ToastAndroid } from 'react-native';

type MyProps = {
    id:number,
    name:string,
    tipo:string
};

type MyState = {};
export default class ItemList extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {

    };

  }



  componentDidMount(){
      
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.number}>{this.props.id + "."}</Text>
            <Text style={styles.name}>{this.props.name}</Text>
          </View>
          <View>
            <Button title="Mostrar"
                color="#841421"
                onPress={() => {
                  
                }}
            />
            <Button title="Evaluar"
                color="#008000"
                onPress={() => {
                  
                }}
            />
          </View>
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
