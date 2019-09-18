import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  ADD_CART_ITEM,
  OPEN_PRODUCT_DETAILS,
} from "../helper/Constant";
import {
  IconButton,
  DefaultButton
} from "../UI";
import { store } from "../../store";

const Translation = require("../helper/Translation.js");

class FavoriteListItem extends Component {
  /*
 
    {
        "creationDate": "2018-07-18T10:45:00",
        "listPrice": 24.99,
        "mediumImageUrl": "/UPLOAD/Flormar/mobile_image_1/thumb/0313035-D37_medium.jpg",
        "productCode": "0313035-D37",
        "productId": 572359,
        "productName": "DELUXE SHINE GLOSS STYLO",
        "salePrice": 9.99,
        "shortCode": "D37",
        "shortName": "GOLDEN BEIGE",
        "smallImageUrl": "/UPLOAD/Flormar/mobile_image_1/thumb/0313035-D37_small.jpg",
    }
    */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const _self = this;
    _self._isMounted = true;
  }

  componentWillUnmount() {
    const _self = this;
    _self._isMounted = false;
  }

  _onAddToCart = () => {
    const _self = this,
      { data = {} } = _self.props,
      { productId } = data;
    store.dispatch({
      type: ADD_CART_ITEM,
      value: { id: productId, quantity: 1, data: data }
    });
  };

  _onRemove = () => {
    const _self = this,
      { data, onRemove } = _self.props;
    Utils.confirm(
      { message: Translation["confirm"]["removeMessage"] },
      ({ type }) => {
        if (type == "ok") {
          const { productId } = data;

          Utils.fetch(Utils.getURL({ key: "user", subKey: "deleteFavoriteProduct" }), JSON.stringify({ productId: productId }), (res) => {
            if (_self._isMounted) {
              const { status, message } = res;
              if (onRemove && status == 200)
                setTimeout(() => {
                  onRemove({ key: "productId", value: productId });
                }, 100);
            }
          }
          );
        }
      }
    );
  };

  _onShowProduct = () => {
    const _self = this,
      { productId } = _self.props.data;
    store.dispatch({
      type: OPEN_PRODUCT_DETAILS,
      value: {
        id: productId,
        measurements: {},
        animate: false,
        sequence: 0
      }
    });
  };

  render() {
    const _self = this,
      { shortName, productName, smallImageUrl, salePrice } = _self.props.data,
      { addTo } = Translation["cart"] || {};

    return (
      <View
        style={{
          flexDirection: "row",
          paddingTop: 20,
          paddingBottom: 20,
          paddingRight: 20,
          paddingLeft: 10,
          borderBottomColor: "#dcdcdc",
          borderBottomWidth: 1,
          marginLeft: 10,
          marginRight: 10
        }}
      >
        <View style={{ width: 60, justifyContent: "center" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={_self._onShowProduct}>
            <Image
              style={{ height: 60 }}
              source={{ uri: Utils.getImage(smallImageUrl) }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={_self._onShowProduct}
              >
                <Text
                  numberOfLines={1}
                  style={{ fontFamily: "Medium", fontSize: 15 }}
                >
                  {productName}
                </Text>
              </TouchableOpacity>
              <IconButton ico={"closedIco"} callback={_self._onRemove} />
            </View>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "RegularTyp2",
                fontSize: 13,
                color: "#555555"
              }}
            >
              {shortName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 21
            }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
              {Utils.getPriceFormat(salePrice)}
            </Text>
            <DefaultButton
              containerStyle={{ height: 36, paddingLeft: 15, paddingRight: 15 }}
              callback={_self._onAddToCart}
              name={addTo}
              boxColor="#FFFFFF"
              textColor="#000000"
              borderColor="#000000"
              animateOnTap={true}
              endName="EKLENDİ"
            />
          </View>
        </View>
      </View>
    );
  }
}

export { FavoriteListItem };