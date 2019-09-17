import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Asset } from "expo";
import {
  ICONS,
  ORDER_LIST_CLICKED,
  SHOW_CUSTOM_POPUP,
} from "root/app/helper/Constant";
import { store } from "root/app/store";

class OrderListItem extends Component {
  /*
    {
  "cargo": Array [],
  "currency": "TL",
  "discountPrice": 5.93,
  "numberOfRows": 2,
  "orderDate": "02012017 17:48:00",
  "orderId": 23419,
  "orderNo": "SIP0065746440",
  "promDiscountPrice": 0,
  "shippingTotal": 4.99,
  "status": "İptal",
  "totalPrice": 24.79,
  "totalPriceWithoutProm": 19.8,
}
    */
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    const _self = this,
      { callback, data } = _self.props;

    /*    if (callback)
            callback({ type: ORDER_LIST_CLICKED, data: data });*/

    store.dispatch({
      type: SHOW_CUSTOM_POPUP,
      value: {
        modalTitle: "SİPARİŞ DETAYI",
        visibility: true,
        type: ORDER_LIST_CLICKED,
        data: { data: data },
        refreshing: _self.props.refreshing || false
      }
    });
  };

  render() {
    const _self = this,
      { orderNo, orderDate, status, totalPrice } = _self.props.data;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={_self._onPress}>
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 20,
            paddingBottom: 10,
            borderBottomColor: "#dcdcdc",
            borderBottomWidth: 1,
            marginLeft: 10,
            marginRight: 10
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{ fontFamily: "Medium", fontSize: 15, marginRight: 20 }}
            >
              {orderNo}
            </Text>
            <Text style={{ fontFamily: "RegularTyp2", fontSize: 13 }}>
              {Utils.getDateFormat(orderDate)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
              {Utils.getPriceFormat(totalPrice)}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "RegularTyp2", fontSize: 15 }}>
                {status}
              </Text>
              <Image
                style={{ width: 40, height: 40 }}
                source={ICONS["rightArrow"]}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export { OrderListItem };