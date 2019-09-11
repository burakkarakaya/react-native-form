import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import { Form } from './app/form';

class Root extends Component {
  constructor(props) {
    super(props);

    this.config = {
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

  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>

      </ScrollView>
    );
  }
}

export default function App() {
  return <Root style={{ flex: 1 }} />;
}