import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, Dimensions } from 'react-native';
import Svg, {
  Line,
  Rect,
  Circle
} from 'react-native-svg';

import firebase from 'react-native-firebase';
import { Button, Provider, Toast, TabBar, Icon } from '@ant-design/react-native';
import NuevoAutomata from './components/nuevoAutomata';
import ListaAutomatas from './components/listaAutomatas';
import CreateFromRegex from './components/createFromRegex';

const { width, height } = Dimensions.get('window');
type MyProps = {};

type MyState = { selectedTab: String};
export default class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
    };
  }

  onChangeTab(tabName: any) {
    this.setState({
      selectedTab: tabName,
    });
  }

  renderContent(pageText: any) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        {/* <SearchBar placeholder="Search" showCancelButton /> */}
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    );
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5"
      >
        <TabBar.Item
          title="Automatas"
          icon={<Icon name="home" />}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => this.onChangeTab('blueTab')}
        >
          <ListaAutomatas />
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name='ordered-list' />}
          title="Crear"
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => this.onChangeTab('redTab')}
        >
          <NuevoAutomata/>
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="code" />}
          title="Regex"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => this.onChangeTab('greenTab')}
        >
          <CreateFromRegex />
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="My"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}
        >
          {this.renderContent('My Tab')}
        </TabBar.Item>
      </TabBar>
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
