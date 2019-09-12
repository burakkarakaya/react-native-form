
import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';


// Let's go

class IconButton extends React.Component{
  _onPress = () => {
    this.props.callback(this.props.name);
  }
  render(){

    const icon = this.props.icon;

    return(
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ width:40, height:40, justifyContent:"center", alignItems:"center" }}>
          {icon}
        </View>
      </TouchableOpacity>
    );
  }
}

export { IconButton };