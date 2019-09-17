
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
} from "root/app/helper/Constant";
import {
  IconButton,
  DefaultButton
} from "root/app/UI";
import { store } from "root/app/store";

const Translation = require("root/app/helper/Translation.js");
const Utils = require("root/app/helper/Global.js");
const Globals = require("root/app/globals.js");

class FollowListItem extends Component {
    /*
          {
              "creationDate": "2017-07-03T15:45:00",
              "listPrice": 14.99,
              "mediumImageUrl": "/UPLOAD/Flormar/mobile_image_1/thumb/0313078-005_medium.jpg",
              "productCode": "0313078-005",
              "productId": 571029,
              "productName": "CARE4LIPS",
              "salePrice": 14.99,
              "shortCode": "005",
              "shortName": "WATERMELON",
              "smallImageUrl": "/UPLOAD/Flormar/mobile_image_1/thumb/0313078-005_small.jpg",
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
        { data = {}, onRemove, config = {} } = _self.props;
      Utils.confirm(
        { message: Translation["confirm"]["removeMessage"] },
        ({ type }) => {
          if (type == "ok") {
            const { productId } = data;
            Globals.AJX(
              {
                _self: _self,
                uri: Utils.getURL(config["deleteURI"]),
                data: { productId: productId }
              },
              res => {
                const { status, message } = res;
                if (onRemove && status == 200)
                  setTimeout(() => {
                    onRemove({ key: "productId", value: productId });
                  }, 100);
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
                    style={{ fontFamily: "Medium", fontSize: 15, width: "90%" }}
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

  export { FollowListItem };