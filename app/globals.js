/* STYLES */
"use strict";
import { Platform } from "react-native";
import { store } from "./store";

const Utils = require("./form/helper/Global.js");

module.exports = {
  // Constants
  exponentPushToken: "",
  API_KEY: "1b9b737f-5582-c8d7-f535-b9750bdeeb90",
  CLIENT: {
    Auth: {}
    // Here we store all session data.
    // .Auth {}
    // .Login {}
  },

  // FUNCTIONS

  // this is the fetch function you call from outside.
  fetch: function (url, data, callback) {
    if (this.CLIENT.Auth != null) {
      var d = new Date(),
        now = d.getTime(), //- d.getTimezoneOffset() * 60000,
        start = new Date(this.CLIENT.Auth.issue),
        expires = start.getTime() + this.CLIENT.Auth.expires_in * 1000;

      if ((expires - now) / 60 / 60 / 1000 > 6) {
        // if less that 6 hours is remained renew token.

        console.log(
          "reused current token, expires in: ",
          (expires - now) / 60 / 60 / 1000
        );
        this._fetchURL(url, data, callback);
      } else {
        console.log("token needs update");
        this._requestAccessToken(url, data, callback);
      }
    } else {
      console.log("there was no token");
      this._requestAccessToken(url, data, callback);
    }
  },

  // calls any url and returns the result.
  _fetchURL: function (query, data, callback) {
    var _this = this;
    /*console.log(
      "z<xz<xz<x",
      this.CLIENT.Auth.session,
      this.CLIENT.Auth.token_type + " " + this.CLIENT.Auth.access_token
    );*/
    // if there is token use headers with token info.
    let HEADERS =
      this.CLIENT.Auth != null
        ? {
          UDID: _this.exponentPushToken || "",
          DEVICE: Platform.OS || "",
          OSVERSION: Platform.Version || "",
          Accept: "application/json",
          "Content-Type": "application/json",
          Session: this.CLIENT.Auth.session,
          Authorization:
            this.CLIENT.Auth.token_type + " " + this.CLIENT.Auth.access_token
        }
        : {
          Accept: "application/json",
          "Content-Type": "application/json"
        };

    // Logging the outgoing request details.
    _this._log({
      url: query,
      headers: HEADERS,
      body: data,
      method: "POST"
    });

    fetch(query, {
      method: "POST",
      headers: HEADERS,
      body: data
    })
      .then(response => {
        // login olduktan sonra kişinin session bilgisi headerdan dönüyor. Bu bilgiyi global session bilgisine yazdırmak
        const header = response.headers || {},
          map = header.map || {},
          session = map.session || "";
        //console.log("session", response.headers);
        if (session != "" && _this.CLIENT.Auth)
          _this.CLIENT.Auth.session = session;

        return response.json();
      })
      .then(function (json) {
        // logging the incoming response.
        //_this._log(json);
        return callback(json);
      })
      .catch(error => callback("error", error));
  },

  _requestAccessToken: function (url, data, callback) {
    var _this = this;

    this._fetchURL(
      Utils.getURL({ key: "user", subKey: "getToken" }),
      JSON.stringify({
        password: API_KEY,
        grant_type: "password"
      }),

      // access token result handler
      answer => {
        console.log("user token ", answer.data);
        if (answer === "error") {
          console.log("fatalllll error: could not get access token");
        } else {
          if (answer.status == 200) {
            this.CLIENT.Auth = answer.data;
            this.CLIENT.Auth.issue = new Date();

            console.log("token renewed successfully!");
            this._fetchURL(url, data, callback);

            this.refreshSecureStorage();
          } else {
            console.log("error getting access token");
          }
        }
      }
    );
  },

  refreshSecureStorage: function () {
    this.setSecureStorage("__USER__", JSON.stringify(this.CLIENT));
  },

  // update this function according to your log service.
  _log: function (data) {
    fetch("http://localhost:8888/log/?v=" + JSON.stringify(data), {
      method: "POST"
    })
      .then(function (response) {
        return null;
      })
      .catch(function (error) {
        console.log("error", error);
      });
  },
  dispatchEvent: function (event) {
    var timestamp = new Date();
    var client_properties = store.getState().general.client_properties || {};
    var _uuid = this.exponentPushToken || "";

    var _body = {
      apiKey: "40e251c5-131e-422e-a7aa-17b4a9b44408",
      type: event.type,
      timestamp: timestamp.getTime(),
      properties: {
        ...client_properties,
        ...event.props,
        uuid: _uuid,
        tz: timestamp.getTimezoneOffset()
      }
    };

    console.log("eventDispatch", _body);

    fetch("https://logv2.corebi.com/api/log", {
      method: "POST",
      body: JSON.stringify(_body)
    })
      .then(function (response) {
        return null;
      })
      .catch(function (error) {
        console.log("error", error);
      });
  },

  // set encrypted local async storage
  setSecureStorage: async function (key, value) {
    try {
      await Expo.SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log("async storage error: ", error);
    }
  },

  // get encrypted local async storage
  getSecureStorage: async function (key, callback) {
    try {
      const value = await Expo.SecureStore.getItemAsync(key);
      if (value !== null) {
        if (value.length > 0) callback(value);
        else callback("no");
      } else {
        callback("no");
      }
    } catch (error) {
      console.log(error + "hola");
    }
  },
  registerForPushNotificationsAsync: async function () {
    const { status: existingStatus } = await Expo.Permissions.getAsync(
      Expo.Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Expo.Permissions.askAsync(
        Expo.Permissions.NOTIFICATIONS
      );
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    this.exponentPushToken = await Expo.Notifications.getExpoPushTokenAsync();

    /*
    return fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "to": this.exponentPushToken,
        "title": "hello",
        "body": "world dsfsdfsdf dsfsdklfjsdklfjsfj",
        "badge": 0
      })
    });
    */

    /*.then((response) => {
      return response.json();
    })
    .then(function (res) {
      alert('success'+JSON.stringify(res));
    })
    .catch((res) => {
      alert('hata' + JSON.stringify(res));
    });*/
  },
  AJX: async function ({ _self, uri, data = {} }, callback) {
    const _t = this;
    _t.fetch(uri, JSON.stringify(data), answer => {
      if (_self._isMounted) {
        if (answer === "error") {
          if (typeof callback !== "undefined") callback("error");
        } else {
          if (answer.status == 200) {
            if (typeof callback !== "undefined") callback(answer, "success");
          } else {
            if (typeof callback !== "undefined") callback(answer, "error");
          }
        }
      }
    });
  },
  _getSegData: function (data) {
    let arr = [];
    Object.keys(data).map(key => {
      const k = data[key] || [];
      if (k.length > 0) {
        Object.keys(k).map(m => {
          arr.push(k[m]);
        });
      }
    });
    return arr;
  },
  getSegKey: function (responses) {
    const { params = {} } = responses[0][0],
      { dynamicItems = "[]" } = params,
      items = JSON.parse(dynamicItems)[0],
      key =
        items["recommendationSource"] +
        "|" +
        items["timeFrame"] +
        "|" +
        items["score"];

    return key || "RECOMMENDATION_SMART_OFFERS|THIS_WEEK|NONE";
  },
  seg: function ({ data }, callback) {
    const _self = this,
      uri =
        "https://gandalf.segmentify.com/add/events/v1.json?apiKey=61c97507-5c1f-46c6-9b50-2aa9d1d73316",
      origin = Utils.prefix,
      { user = {}, segmentify = {} } = store.getState(),
      { userId } = user['user'] || {},
      sessionId = userId ? _self.CLIENT.Auth.session : ( segmentify["sessionID"] || "YYYYYYYYYYYYYYYY" ),
      obj = {
        userId: userId || segmentify["userID"] || "XXXXXXXXXXXXXXXXX",
        // hic clinet olmayinca bu hata veriyor. bunu asagidaki ile degistirdim '_self.CLIENT.Auth.session'. ( _self.CLIENT.Auth ? _self.CLIENT.Auth.session : false )
        sessionId: sessionId,
        device: Platform.OS === "ios" ? "IOS" : "ANDROID",
        pageUrl: origin
      };

    Object.keys(data).map(key => {
      obj[key] = data[key];
    });

    //console.log('segmentify', obj);

    fetch(uri, {
      method: "POST",
      headers: {
        origin: origin,
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => { 
        return response.json();
      })
      .then(function (res) { 
        if (typeof callback !== "undefined")
          callback({ type: "success", data: res });
      })
      .catch(res => {
        if (typeof callback !== "undefined")
          callback({ type: "error", data: res });
      });
  }
};
