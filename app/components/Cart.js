import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

class Cart extends React.Component {
  state = {};

  componentDidMount() {}

  _onPress = () => {
    const { onCardPress } = this.props;

    if (onCardPress) onCardPress();
  };

  render() {
    const _self = this,
      bubble =
        this.props.cartProductsNumber > 0 ? (
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>
              {this.props.cartProductsNumber}
            </Text>
          </View>
        ) : null;

    return (
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={_self._onPress}>
          {bubble}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "#ffffff",
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    left: 20,
    top: 20,
    borderWidth: 1,
    borderColor: "#FE136F",
    justifyContent: "center",
    alignItems: "center"
  },
  bubbleText: {
    color: "#FE136F",
    fontSize: 11
  }
});

// filter state
function mapStateToProps(state) {
  return state.cart;
}

export default connect(mapStateToProps)(Cart);
