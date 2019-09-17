import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";

class CouponListItem extends Component {
  constructor(props) {
    super(props);
  }
  /*
      {
        "couponKey": "SUPER75",
        "description": "75 TL ve Üzeri Alışverişlerde Supershine Lipstick Bordeaux Silk Hediye",
        "email": "",
        "endDate": "2018-08-20T00:00:00",
        "isVisibleInCouponPage": null,
        "onlyForFirstUser": false,
        "priceTypeId": 333,
        "startDate": "2018-07-05T00:00:00",
        "statusName": "Süresi Doldu",
        "totalUsageCount": 100000000,
        "usageCountPerUser": 10000,
        "userCategoryId": 0,
        }
    */

  _setDateFormat = k => {
    k = k || "";
    return k.split("T")[0];
  };

  render() {
    let _self = this,
      {
        couponKey,
        description,
        startDate = "",
        endDate = "",
        statusName = ""
      } = _self.props.data;

    startDate = _self._setDateFormat(startDate);
    endDate = _self._setDateFormat(endDate);

    return (
      <View
        style={{
          borderBottomColor: "#dcdcdc",
          borderBottomWidth: 1,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 15
        }}
      >
        <Text style={{ fontFamily: "Bold", fontSize: 14, marginBottom: 6 }}>
          {couponKey}
        </Text>
        <Text style={{ fontFamily: "RegularTyp2", fontSize: 14 }}>
          {description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            paddingBottom: 15
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "RegularTyp2",
                fontSize: 12,
                color: "#828282",
                paddingBottom: 6
              }}
            >
              {"Başlangıç Tarihi"}
            </Text>
            <Text style={{ fontFamily: "RegularTyp2", fontSize: 14 }}>
              {startDate}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "RegularTyp2",
                fontSize: 12,
                color: "#828282",
                paddingBottom: 6
              }}
            >
              {"Bitiş Tarihi"}
            </Text>
            <Text style={{ fontFamily: "RegularTyp2", fontSize: 14 }}>
              {endDate}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "RegularTyp2",
                fontSize: 12,
                color: "#828282",
                paddingBottom: 6
              }}
            >
              {"Durum"}
            </Text>
            <Text style={{ fontFamily: "RegularTyp2", fontSize: 14 }}>
              {statusName}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export { CouponListItem }