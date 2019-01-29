import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


type MyProps = {title:String};

type MyState = {};
export default class NavBar extends React.Component<MyProps, MyState> {
    constructor(props: any) {
      super(props);
      this.state = {
      };
    }

    render(){
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    titleContainer: {
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#D6D7DA',
      backgroundColor: 'blue'
    },
});