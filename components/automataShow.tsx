import React, { Component } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import Automata from '../models/automata';
import Svg, {
    Line,
    Rect,Path,
    Circle,Text
  } from 'react-native-svg';
import { array } from 'prop-types';

type MyProps = {automata: Automata};

type MyState = {circleRadius:number};

export default class AutomatShow extends React.Component<MyProps, MyState> {
    constructor(props:any) {
      super(props)
    
      this.state = {
         circleRadius:20
      }

      this.setStatesPositions = this.setStatesPositions.bind(this);
    }

    setStatesPositions(){
        let i = this.props.automata.estados.size;
        let automata = this.props.automata;
        if(i < 4){
            for (let index = 0; index < this.props.automata.estados.size; index++) {
                automata.estados.get(index).posX = 20 + (index*30);
                automata.estados.get(index).posY = 50;
            }    
        }
        else if(i == 4){
            let m = 0;
            for (let index = 0; index < this.props.automata.estados.size; index++) {
                if(index == 0 || index == 1){
                    automata.estados.get(index).posX = 20 + (index*30);
                    automata.estados.get(index).posY = 30;    
                }else{

                    automata.estados.get(index).posX = 20 + (m*30);
                    automata.estados.get(index).posY = 60;
                    m++
                }
            }    
        }
        else if(i == 5){
            let m = 0;
            for (let index = 0; index < this.props.automata.estados.size; index++) {
                if(index == 0 || index == 1){
                    automata.estados.get(index).posX = 20 + (index*30);
                    automata.estados.get(index).posY = 30;    
                }
                else if(index == 2){
                    automata.estados.get(index).posX = 20 + (15);
                    automata.estados.get(index).posY = 50;
                }
                else{
                    automata.estados.get(index).posX = 20 + (m*30);
                    automata.estados.get(index).posY = 70;
                    m++
                }
            }    
        }

        this.setState({automata: automata});
    }

    componentDidMount(){
        this.setStatesPositions();
    }
    
  render() {
      var statesCircles: Array<any> = new Array(this.props.automata.estados.size);
      for (let index = 0; index < this.props.automata.estados.size; index++) {
          statesCircles[index] = this.props.automata.estados.get(index);
          
      }
    return (
      <View style={styles.container}>
        <Svg
            height="95%"
            width="100%"
        >
        {statesCircles.map((el,index) => {
            let x = el.esFinal?<Circle
                    key={index}
                    cx= {el.posX+"%"}
                    cy={el.posY+"%"}
                    r={this.state.circleRadius}
                    fill="pink"
                    stroke='red'
                    strokeWidth="5"
                />:<Circle
                key={index}
                cx= {el.posX+"%"}
                cy={el.posY+"%"}
                r={this.state.circleRadius}
                fill="pink"
            />
            return (
            <View key={index}>
                {el.esInicial? <Line x1={el.posX+50}
                                y1={el.posY+"%"}
                                x2={el.posX}
                                y2={el.posY+"%"}
                                stroke="blue"
                                strokeWidth="2"/>:null}
                {x}
                <Text x = {el.posX+"%"} y = {(el.posY-5) + "%"}>{"q" + index}</Text>
            </View>
            )

        })}
        </Svg>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      width: '100%'
    }
  });