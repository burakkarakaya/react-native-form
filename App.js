import React, { Component } from 'react';
import {
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Form } from './app/form';

// global variable
global.API_KEY = '1b9b737f-5582-c8d7-f535-b9750bdeeb90';

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

  _callback = (obj) => {
    console.log(obj);
  }

  render() {
    const _self = this;

    return (

      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Form data={_self.config['changePassword']} callback={_self._callback} />
          <Form data={_self.config['createAddress']} callback={_self._callback} />
          <Form data={_self.config['createUser']} callback={_self._callback} />
          <Form data={_self.config['creditCart']} callback={_self._callback} />
          <Form data={_self.config['deleteCoupon']} callback={_self._callback} />
          <Form data={_self.config['login']} callback={_self._callback} />
          <Form data={_self.config['recoverPassword']} callback={_self._callback} />
          <Form data={_self.config['review_submission']} callback={_self._callback} />
          <Form data={_self.config['setAddress']} callback={_self._callback} />
          <Form data={_self.config['setUser']} callback={_self._callback} />
          <Form data={_self.config['useCoupon']} callback={_self._callback} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default function App() {
  return <Root style={{ flex: 1 }} />;
}