import React, { Component, PureComponent } from 'react';
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text
} from 'react-native';
import { Form } from './app/form';
import { Viewer } from './app/viewer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//redux
import { Provider } from "react-redux";
import { store } from "./app/store.js";

// global variable
global.Utils = require('./app/globals.js');

// tanımlı formlar
const FormConfig = {
  changePassword: require('./data/changePassword.js'),
  createAddress: require('./data/createAddress.js'),
  createUser: require('./data/createUser.js'),
  creditCart: require('./data/creditCart.js'),
  deleteCoupon: require('./data/deleteCoupon.js'),
  login: require('./data/login.js'),
  recoverPassword: require('./data/recoverPassword.js'),
  review_submission: require('./data/review_submission.js'),
  setAddress: require('./data/setAddress.js'),
  setUser: require('./data/setUser.js'),
  useCoupon: require('./data/useCoupon.js'),
};

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

  _onButtonClick = (key) => {
    this.props.navigation.navigate('Detail', { active: key });
  }

  _button = (key) => {
    const _self = this;

    return (
      <TouchableOpacity onPress={this._onButtonClick.bind(this, key)}>
        <Text>{key}</Text>
      </TouchableOpacity>
    );
  }

  _buttonRender = () => {
    const _self = this,
      arr = [];
    Object
      .entries(FormConfig)
      .forEach(([key, value]) => {
        arr.push(_self._button(key));
      });

    return arr;
  }

  render() {
    const _self = this;

    return (
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {_self._buttonRender()}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

class Detail extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const _self = this,
      { active = '' } = _self.props.navigation.state.params || {};
    return (
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Form data={FormConfig[active]} callback={_self._callback} />
        </SafeAreaView>
      </ScrollView>

    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Root,
  },
  Detail: {
    screen: Detail,
  }
},
  {
    headerMode: 'none'
  });


export default createAppContainer(AppNavigator);