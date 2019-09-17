import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import {
  ICONS,
  SERVICE_LIST_CLICKED,
} from "root/app/helper/Constant";
import { store } from "root/app/store";

class ServiceListItem extends Component {
    /*
      {
          "serviceId": 0,
          "serviceName": "string",
          "countryId": 0,
          "cityId": 0,
          "districtName": "string",
          "serviceLatitude": "string",
          "serviceLongitude": "string",
          "phoneNo": "string",
          "fax": "string",
          "picture": "string",
          "address": "string"
        }
      */
    constructor(props) {
      super(props);
      this.state = {
        distance: null,
        duration: null
      };
    }
  
    componentDidMount() {
      const _self = this;
      _self._isMounted = true;
      _self.setAjx();
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      const _self = this;
      if (!Utils.isArrEqual(_self.state.distance, nextState.distance))
        return true;
  
      return false;
    }
  
    componentWillUnmount() {
      this._isMounted = false;
    }
  
    setAjx = async () => {
      const _self = this,
        { permission, location = null } = store.getState().location || {},
        { serviceLatitude = "", serviceLongitude = "" } = _self.props.data;
  
      if (
        serviceLatitude != "" &&
        serviceLongitude != "" &&
        permission &&
        location != null
      ) {
        const uri = Utils.getCustomURL({
          key: "location",
          origins:
            location["coords"]["latitude"] +
            "," +
            location["coords"]["longitude"],
          destinations: serviceLatitude + "," + serviceLongitude
        });
  
        Utils.ajx({ uri: uri }, res => {
          if (res["type"] == "success" && _self._isMounted) {
            const data = res["data"] || {},
              elements = data["rows"][0]["elements"][0],
              duration = elements["duration"] || {},
              distance = elements["distance"] || {};
            _self.setState({
              distance: distance["text"] || "",
              duration: duration["text"] || ""
            });
          }
        });
      }
    };
  
    _onPress = () => {
      const _self = this,
        { callback, data } = _self.props;
      if (callback) callback({ type: SERVICE_LIST_CLICKED, data: data });
    };
  
    _isLocation = () => {
      const _self = this,
        { serviceLatitude = "", serviceLongitude = "" } = _self.props.data,
        { distance = null, duration = null } = _self.state;
  
      let view = null;
      if (serviceLatitude != "" && serviceLongitude != "") {
        view = (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5
            }}
          >
            <Text style={{ fontSize: 15 }}>
              {distance} {duration}
            </Text>
            <Image
              style={{ width: 40, height: 40 }}
              source={ICONS["rightArrow"]}
            />
          </View>
        );
      }
      return view;
    };
  
    render() {
      const _self = this,
        { serviceName, address } = _self.props.data;
  
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={_self._onPress}>
          <View
            style={{
              paddingBottom: 15,
              paddingTop: 20,
              paddingLeft: 10,
              paddingRight: 10,
              borderBottomColor: "#dcdcdc",
              borderBottomWidth: 1,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <Text style={{ fontFamily: "Medium", fontSize: 16, marginBottom: 6 }}>
              {Utils.trimText(serviceName).toUpperCase()}
            </Text>
            <Text style={{ fontFamily: "RegularTyp2", fontSize: 15 }}>
              {Utils.trimText(address)}
            </Text>
            {_self._isLocation()}
          </View>
        </TouchableOpacity>
      );
    }
  }

  export { ServiceListItem };