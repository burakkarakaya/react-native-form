import React, { Component } from "react";
import {
  Text,
  View,
  Image,
} from "react-native";
import {
  UPDATE_CART,
  REMOVE_CART,
} from "../helper/Constant";
import {
  IconButton,
} from "../UI";
import { SelectBox } from "../../form/components";

const Translation = require("../helper/Translation.js");
//const Analytics = require("root/app/analytics");

class CartListItem extends Component {
  /*
    {
        "cartItemId": 3281917,
        "productId": 567060,
        "productName": "SILK MATTE LIQUID LIPSTICK",
        "brandId": 3064,
        "brandName": "Flormar",
        "shortName": null,
        "shortCode": null,
        "productCode": "0313062-002",
        "productShortDesc": "Dudakları kurutmayan, ipeksi matlık sunan likit ruj.",
        "productOption1": "",
        "productOption2": "",
        "quantity": 2,
        "unitCode": "Adet",
        "mediumImageUrl": "http://mcdn.flormar.com.tr/UPLOAD/Flormar/mobile_image_1/thumb/0313062-002.jpg",
        "smallImageUrl": "http://mcdn.flormar.com.tr/UPLOAD/Flormar/mobile_image_1/thumb/0313062-002.jpg",
        "firstPrice": 30,
        "firstPriceTotal": 60,
        "salePrice": 29.99,
        "discountTotal": 0,
        "brutTotal": 50.82,
        "taxTotal": 9.15,
        "total": 59.98,
        "netTotal": 59.98,
        "hasStock": true,
        "isGiftPackage": false,
        "giftPackageId": 0,
        "mainCartItemId": 0,
        "bundleId": 0,
        "bundleSelectType": 0,
        "isReadOnly": true,
        "productTypes": [
          {
            "productTypeId": 76,
            "productTypeName": "MAT ETKİ"
          }
        ]
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

  _callback = obj => {
    const _self = this,
      { callback } = _self.props;

    if (callback) callback(obj);
  };

  _onChange = ({ value = 1 }) => {
    const _self = this,
      { data = {}, onUpdateItem } = _self.props,
      { cartItemId } = data;

    Utils.fetch(Utils.getURL({ key: "cart", subKey: "updateCartLine" }), JSON.stringify({ cartItemId: cartItemId, quantity: value }), (res) => {
      if (_self._isMounted) {
        const { status, message = "" } = res;
        if (status == 200 && onUpdateItem)
          onUpdateItem({ type: UPDATE_CART, data: res });
        else
          setTimeout(() => {
            Utils.alert({ message: message }, () => {
              if (onUpdateItem) onUpdateItem({ type: UPDATE_CART });
            });
          }, 300);

      }
    }
    );
  };

  _onRemove = () => {
    const _self = this,
      { data = {}, onUpdateItem } = _self.props,
      { cartItemId } = data;

    Utils.confirm(
      { message: Translation["confirm"]["removeMessage"] },
      ({ type }) => {
        if (type == "ok") {
          Utils.fetch(Utils.getURL({ key: "cart", subKey: "deleteCartLine" }), JSON.stringify({ cartItemId: [cartItemId] }), (res) => {
            if (_self._isMounted) {
              const { status, message } = res;
              if (status == 200 && onUpdateItem)
                setTimeout(() => {
                  onUpdateItem({ type: REMOVE_CART, data: res });
                }, 100);

              Analytics.send({ event: Analytics.events.removed_from_cart, data: data });
            }
          }
          );
        }
      }
    );
  };

  getSelectValue = () => {
    const _self = this,
      { data = {} } = _self.props,
      { quantity, unitCode = "Adet" } = data,
      values = [],
      arr = [15, 20, 30, 40];

    for (var i = 1; i <= 10; ++i) arr.push(i);

    if (!arr.includes(quantity)) arr.push(quantity);

    arr.sort((a, b) => a - b);

    for (var i = 0; i < arr.length; ++i) {
      const k = arr[i];
      values.push({ key: k + " " + unitCode, value: k });
    }

    return { values: values, value: quantity };
  };

  _getPromotions = () => {
    const _self = this,
      { data = {} } = _self.props,
      { promotions = [] } = data;

    return promotions.map((itm, ind) => {
      const { promotionName = "" } = itm;
      return (
        <Text
          key={ind}
          style={{
            marginTop: 10,
            fontSize: 12,
            fontFamily: "RegularTyp2",
            color: "rgb(255, 43, 148)"
          }}
        >
          {promotionName}
        </Text>
      );
    });
  };

  _getView = () => {
    const _self = this,
      { data = {}, viewType = "" } = _self.props,
      { shortName, productName = "", total = 0, netTotal = 0, firstPriceTotal = 0 } = data;

    const prc =
      netTotal == firstPriceTotal ? (
        <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
          {Utils.getPriceFormat(netTotal)}
        </Text>
      ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
              {Utils.getPriceFormat(netTotal)}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: "Bold",
                fontSize: 13,
                textDecorationLine: "line-through"
              }}
            >
              {Utils.getPriceFormat(firstPriceTotal)}
            </Text>
          </View>
        );

    if (viewType == "miniCart")
      return (
        <View style={{ flex: 1 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text
                numberOfLines={1}
                style={{ fontFamily: "Medium", fontSize: 15, width: "90%" }}
              >
                {productName}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16
            }}
          >
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
            {prc}
          </View>
        </View>
      );
    else
      return (
        <View style={{ flex: 1 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text
                numberOfLines={1}
                style={{ fontFamily: "Medium", fontSize: 15, width: "90%" }}
              >
                {productName}
              </Text>
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
              marginTop: 16
            }}
          >
            <SelectBox
              fontStyle={{ fontSize: 12, fontFamily: "RegularTyp2" }}
              showHeader={false}
              wrapperStyle={{ width: 85, height: 30, borderRadius: 15 }}
              containerStyle={{ marginBottom: 0 }}
              closed={true}
              callback={_self._onChange}
              data={_self.getSelectValue()}
            />

            {prc}
          </View>
        </View>
      );
  };

  render() {
    const _self = this,
      { data = {}, index = 0, totalCount = 0 } = _self.props,
      { smallImageUrl } = data,
      marginBottom = index == totalCount - 1 ? 0 : 10,
      view = _self._getView();

    return (
      <View
        style={{
          paddingTop: 15,
          paddingBottom: 15,
          paddingRight: 20,
          paddingLeft: 10,
          borderBottomColor: "#dcdcdc",
          borderBottomWidth: 1,
          marginBottom: marginBottom,
          marginLeft: 10,
          marginRight: 10
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 60, justifyContent: "center" }}>
            <Image
              style={{ width: 49, height: 60 }}
              source={{ uri: Utils.getImage(smallImageUrl) }}
            />
          </View>
          {view}
        </View>
        {_self._getPromotions()}
      </View>
    );
  }
}

export { CartListItem };