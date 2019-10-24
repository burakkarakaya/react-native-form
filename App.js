import React, { Component, PureComponent } from 'react';
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Form } from './app/form';
import { Viewer } from './app/viewer';
import { MainMenu, Brands } from './app/views';
import Stores from './app/stores';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//redux
import { Provider } from "react-redux";
import { store } from "./app/store.js";

// global variable
global.Utils = require('./app/globals.js');

// import config
const config = require('./app/config.js');


class Root extends PureComponent {
  constructor(props) {
    super(props);
  }

  _callback = (obj) => {
    console.log(obj);
  }

  /* 
    button
  */

  _onButtonClick = (key, type) => {
    this.props.navigation.navigate('Detail', { active: key, type: type });
  }

  _button = (key, type) => {
    const _self = this;
    return (
      <TouchableOpacity onPress={this._onButtonClick.bind(this, key, type)}>
        <Text>{key}</Text>
      </TouchableOpacity>
    );
  }

  _buttonRender = ({ type }) => {
    const _self = this,
      arr = [];
    Object
      .entries(config[type])
      .forEach(([key, value]) => {
        arr.push(_self._button(key, type));
      });

    return arr;
  }

  render() {
    const _self = this,
      buttonForm = _self._buttonRender({ type: 'form' }),
      buttonViewer = _self._buttonRender({ type: 'viewer' }),
      buttonMap = _self._button('stores', 'stores'),
      buttonContent = _self._buttonRender({ type: 'content' }),
      mainMenu = _self._button('menu', 'menu'),
      brands = _self._button('brands', 'brands');

    return (
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={{ paddingBottom: 15, fontSize: 20 }}>FORM</Text>
          {buttonForm}
          <Text style={{ paddingTop: 35, paddingBottom: 15, fontSize: 20 }}>VIWER</Text>
          {buttonViewer}
          <Text style={{ paddingTop: 35, paddingBottom: 15, fontSize: 20 }}>HARİTA</Text>
          {buttonMap}
          <Text style={{ paddingTop: 35, paddingBottom: 15, fontSize: 20 }}>İÇERİK</Text>
          {buttonContent}
          <Text style={{ paddingTop: 35, paddingBottom: 15, fontSize: 20 }}>ANA MENU</Text>
          {mainMenu}
          <Text style={{ paddingTop: 35, paddingBottom: 15, fontSize: 20 }}>MARKALAR</Text>
          {brands}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

class Detail extends PureComponent {
  constructor(props) {
    super(props);
  }

  _getContainer = (children) => {
    return (
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        {children}
      </ScrollView>
    )
  }

  _getView = () => {
    const _self = this,
      { active = '', type = '' } = _self.props.navigation.state.params || {};

    switch (type) {
      case 'form':
        return _self._getContainer( <Form data={config['form'][active]} callback={_self._callback} /> );

      case 'viewer':
        return <Viewer config={config['viewer'][active]} refreshing={false} />;

      case 'content':
        return <Viewer config={config['content'][active]} refreshing={false} />;

      case 'stores':
        return <Stores />;

      case 'menu':
        return <MainMenu />;
      
      case 'brands':
        return <Brands />;

      default:
        return null;
    }
  }

  render() {
    const _self = this,
      view = _self._getView();

    return (
        <SafeAreaView style={{ flex: 1 }}>
          {view}
        </SafeAreaView>
    );
  }
}

// navigator
const AppNavigator =
  createStackNavigator({
    Home: {
      screen: Root,
    },
    Detail: {
      screen: Detail,
    }
  },
    {
      headerMode: 'none'
    }),
  StackNavigator = createAppContainer(AppNavigator);

//
export default function App() {
  return (

    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={"padding"}
        pointerEvents="box-none"
        style={{
          flex: 1
        }}
      >
        <StackNavigator />
      </KeyboardAvoidingView>
    </Provider>
  );
};