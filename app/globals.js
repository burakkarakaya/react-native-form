import {
  Alert,
  Platform,
} from 'react-native';

module.exports = {
  exponentPushToken: '',
  API_KEY: '4c845d16-b197-77ab-c123-79325d549176',
  mapApiKey: 'AIzaSyDktunNtvwuVvGEA6LSVfQoiRsptLStTgc',
  prefix: 'https://www.cosmetica.com.tr',
  imagePrefix: 'cosmetica.com.tr',
  CLIENT: {
    Auth: {}
    // Here we store all session data.
    // .Auth {}
    // .Login {}
  },
  URLs: {
    style: {
      main: '/upload/APP/styles/mobiApp.css'
    },
    banner: {
      getBannerList: '/api/v3/Banner/getBannerList'
    },
    product: {
      getCategoryList: '/api/v3/Product/getCategoryList',
      getSearchSuggestionList: '/api/v3/Product/getSearchSuggestionList',
      getProductList: '/api/v3/Product/getProductList',
      getProductDetail: '/api/v3/Product/getProductDetail',
      getProductVideos: '/mobile-app-product-video-export.html',
      getProductIdByBarcode: '/api/v3/Product/getProductIdByBarcode'
    },
    user: {
      addFavoriteProduct: '/api/v3/User/addFavoriteProduct',
      deleteFavoriteProduct: '/api/v3/User/deleteFavoriteProduct',
      getToken: '/api/v3/User/getToken',
      getUser: '/api/v3/User/getUser',
      setUser: '/api/v3/User/setUser',
      createUser: '/api/v3/User/createUser',
      login: '/api/v3/User/login',
      logout: '/api/v3/User/logout',
      recoverPassword: '/api/v3/User/recoverPassword',
      changePassword: '/api/v3/User/changePassword',
      getFavoriteProductList: '/api/v3/User/getFavoriteProductList',
      deleteFavoriteProduct: '/api/v3/User/deleteFavoriteProduct',
      getAgreement: '/api/v3/User/getAgreement',
      getStockFollowUpList: '/api/v3/User/getStockFollowUpList', // takip listem - Stoğa Girenler
      getPriceFollowUpList: '/api/v3/User/getPriceFollowUpList', // takip listem - fiyatı düşenler
      checkGuestMail: '/api/v3/User/checkGuestMail',
      CheckUserPhoneNumber: '/api/v3/User/CheckUserPhoneNumber',
      deleteStockFollowUpProduct: '/api/v3/User/deleteStockFollowUpProduct',
      deletePriceFollowUpProduct: '/api/v3/User/deletePriceFollowUpProduct',
      addStockFollowUpProduct: '/api/v3/User/addStockFollowUpProduct',
      addPriceFollowUpProduct: '/api/v3/User/addPriceFollowUpProduct'
    },
    address: {
      country: '/api/v3/Address/getCountry',
      city: '/api/v3/Address/getCity',
      district: '/api/v3/Address/getDistrict',
      createAddress: '/api/v3/Address/createAddress',
      getAddress: '/api/v3/Address/getAddress',
      setAddress: '/api/v3/Address/setAddress',
      deleteAddress: '/api/v3/Address/deleteAddress',
    },
    order: {
      getOrder: '/api/v3/Order/getOrder', // siparişlerim
      getOrderDetail: '/api/v3/Order/getOrderDetail', // sipariş detay
      repeatOrder: '/api/v3/Order/repeatOrder', // sipariş tekrarla
      getCancelationReasonList: '/api/v3/Order/getCancelationReasonList',
      cancelOrder: '/api/v3/Order/cancelOrder'
    },
    integrator: {
      /*
          Implementation Notes
          StatusId : 1(New), 2(Approved), 3(Cancel), 4(Used) - Type : 1(Gift Cart), 2(Discount Coupon)
      */
      getCouponDetail: '/api/v3/Integrator/getCouponDetail' // kuponlarım
    },
    service: {
      getServiceList: '/api/v3/Service/getServiceList', // servis listesi
      getServiceTypeList: '/api/v3/Service/getServiceTypeList',
    },
    export: {
      getExport: '/api/v3/Export/getExport',
    },
    content: {
      getContent: '/api/v3/Content/getContent',
      getDataByUrl: '/api/v3/Content/getDataByUrl',
    },
    cart: {
      checkCreditCard: '/api/v3/Cart/checkCreditCard',
      validateCart: '/api/v3/Cart/validateCart',
      getCart: '/api/v3/Cart/getCart',
      setCart: '/api/v3/Cart/setCart',
      addCartLine: '/api/v3/Cart/addCartLine',
      updateCartLine: '/api/v3/Cart/updateCartLine',
      deleteCartLine: '/api/v3/Cart/deleteCartLine',
      useCoupon: '/api/v3/Cart/useCoupon',
      deleteCoupon: '/api/v3/Cart/deleteCoupon',
      getCargo: '/api/v3/Cart/getCargo',
      getPayment: '/api/v3/Cart/getPayment',
      getAgreement: '/api/v3/Cart/getAgreement',
      getInstallment: '/api/v3/Cart/getInstallment',
      getBankTransfer: '/api/v3/Cart/getBankTransfer',
      getPos3DParameter: '/api/v3/Cart/getPos3DParameter',
      checkBankPoint: '/api/v3/Cart/checkBankPoint',
      setCartOrder: '/api/v3/Cart/setCartOrder'
    },
  },
  customURLs: {
    location: 'https://maps.googleapis.com/maps/api/distancematrix/json?language={{lang}}&units=metric&origins={{origins}}&destinations={{destinations}}&key={{mapApiKey}}',
  },
  getCustomURL: function ({ key = '', lang = 'tr-TR', origins = '', destinations = '', limit = '', id = '' }) {
    const _t = this;

    return (_t.customURLs[key] || '')
      .replace(/{{lang}}/g, lang)
      .replace(/{{origins}}/g, origins)
      .replace(/{{destinations}}/g, destinations)
      .replace(/{{mapApiKey}}/g, _t.mapApiKey)
      .replace(/{{id}}/g, id)
      .replace(/{{limit}}/g, limit);
  },
  getURL: function ({ key = '', subKey = '' }) {
    const _t = this;
    return _t.prefix + (_t.URLs[key][subKey] || '');
  },
  getWebsiteURL: function (k) {
    k = k || '';
    const _t = this;
    /*  
      canlı sitede url de mobiapp=true görünce css ile header, footer gizliyoruz. 
      bunu webview içerisinde göstermek için gelen url mobiapp=true ekliyor.

      ex url: /siparis/
      result url: https://www.cosmetica.com.tr/siparis/?mobiapp=true
    */
    if (k.indexOf(_t.imagePrefix) == -1)
      k = _t.prefix + k;

    if (k.indexOf('mobiapp=true') == -1) {
      if (k.indexOf('?') != -1)
        k = k + '&mobiapp=true';
      else
        k = k + '?mobiapp=true';
    }
    return k;
  },
  regex: {
    typ1: /[^a-zA-ZıiIğüşöçİĞÜŞÖÇ\s]+/g, /* sadece harf */
    typ2: /[^0-9\s]+/g, /* sadece rakam */
    typ3: /[^a-zA-ZıiI0-9ğüşöçİĞÜŞÖÇ\s]+/g, /* harf rakam karışık */
    typ4: /[^a-zA-ZıiI0-9ğüşöçİĞÜŞÖÇ:\/\s]+/g, /* address alanı için */
    typ5: /[^0-9\(\)\s]+/g, /* telefon için */
  },
  getRegex: function ({ key = '', value }) {
    value = value || '';
    const _t = this,
      rgx = _t.regex[key] || '';
    if (rgx)
      return value.replace(rgx, '');
    else
      return value;
  },
  detect: (k) => {
    k = k || [];
    return k.length == 0 ? false : true;
  },
  trimText: (k) => {
    k = k || '';
    return k.replace(/(^\s+|\s+$)/g, '');
  },
  cleanText: (k) => {
    k = k || '';
    return k.replace(/\s+/g, '');
  },
  toUpperCase: function (k) {
    k = k || '';
    var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" },
      n = '';
    for (var i = 0; i < k.length; ++i) {
      var j = k[i];
      n += (letters[j] || j);
    }
    return n.toUpperCase() || '';
  },
  clearHtmlTag: function (k) {
    /* https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/ */
    k = k || '';
    return k.replace(/(<([^>]+)>)/ig, '');
  },
  removeStyleTag: function (k) {
    k = k || '';
    return k.replace(/(style=".*")/g, '');
  },
  subtractDate: (o) => {
    var typ = o['typ'] || 'remove',
      days = o['day'] || 0,
      months = o['month'] || 0,
      years = o['year'] || 0,
      date = new Date();

    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);

    return { data: date, dateFormat: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() };
  },
  isArrEqual: function (value, other) {
    /* https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/ */
    const _self = this;

    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1, item2) {

      // Get the object type
      var itemType = Object.prototype.toString.call(item1);

      // If an object or array, compare recursively
      if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
        if (!_self.isArrEqual(item1, item2)) return false;
      }

      // Otherwise, do a simple comparison
      else {

        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) return false;

        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (itemType === '[object Function]') {
          if (item1.toString() !== item2.toString()) return false;
        } else {
          if (item1 !== item2) return false;
        }

      }
    };

    // Compare properties
    if (type === '[object Array]') {
      for (var i = 0; i < valueLen; i++) {
        if (compare(value[i], other[i]) === false) return false;
      }
    } else {
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          if (compare(value[key], other[key]) === false) return false;
        }
      }
    }

    // If nothing failed, return true
    return true;

  },
  getImage: function (k) {
    k = k || '';
    const _t = this;
    /* favori ürünlerde resmin tam yolu gelmiyor o durumu çözmek için kullanılacak */
    if (k.indexOf(_t.imagePrefix) == -1)
      k = _t.prefix + k;
    return k;
  },
  getNumberFormat: function (k) {
    k = k || '0';
    return parseFloat(k.replace(/\./g, '').replace(/\,/g, '.'));
  },
  getPriceFormat: function (k) {
    k = (k || '0');

    if (k.toString().indexOf('.') != -1)
      k = parseFloat(k).toFixed(2);

    /* fiyat formatlama */
    return '₺' + k.toString().replace(/\./g, ',');
  },
  getDateFormat: function (k) {
    k = k || '';
    /* date formatlama, "orderDate": "02012017 17:48:00" */
    k = k.split(' ')[0];
    return (k.slice(0, 2) + '.' + k.slice(2, 4) + '.' + k.slice(4, 8));
  },
  setDateFormat: function (k) {
    k = parseFloat(k || '0');
    if (k < 10)
      k = '0' + k;
    return k
  },
  customDateFormat: function (k) {
    k = k || '';
    var _t = this;
    /* date formatlama, "birtday": "22.1.1990 00:00:00 => 22011990" */
    k = k.split(' ')[0];
    k = k.split('.');

    k[0] = _t.setDateFormat(k[0]);
    k[1] = _t.setDateFormat(k[1]);

    return (k[0] + '' + k[1] + '' + k[2]);
  },
  customPhoneFormat: function (k) {
    k = k || '';
    /* phone formatlama, "mobilePhone": "0(999) 9999999 => 9999999999" */
    if (k[0] == 0)
      k = k.substr(1, k.length);

    return k.replace(/\(/g, '').replace(/\)/g, '').replace(/\s+/g, '');
  },
  getPrdCodeToArr: function (k) {
    /* 
     584579 ,584555 ,584553 ,584534 ,584530 ,584510
     =>
     [584579,584555,584553,584534,584530,584510]
   */

    k = k || '';
    const _t = this,
      code = [];

    k = _t.cleanText(k).split(',');
    for (var i = 0; i <= k.length; ++i) {
      var n = k[i];
      if (n != '' && n)
        code.push({ productId: n });
    }

    return code;
  },
  confirm: function ({ title = 'Uyarı', message = '' }, callback) {
    const cancel = 'İptal', ok = 'Tamam';
    Alert.alert(
      title,
      message,
      [
        {
          text: cancel,
          onPress: () => {
            if (typeof callback !== 'undefined')
              callback({ type: 'cancel' });
          }
        },
        {
          text: ok,
          onPress: () => {
            if (typeof callback !== 'undefined')
              callback({ type: 'ok' });
          }
        }
      ],
      {
        cancelable: false
      }
    )
  },
  alert: async function ({ title = 'Uyarı', message = '' }, callback) {
    const ok = 'Tamam';
    Alert.alert(
      title,
      message,
      [
        {
          text: ok,
          onPress: () => {
            if (typeof callback !== 'undefined')
              callback({ type: 'ok' });
          }
        }
      ],
      {
        cancelable: false
      }
    )
  },
  filterToSelectObject: function ({ filters = [], sorts = [] }) {
    const obj = {}, filter = { sendAjx: false, buttonText: 'UYGULA', showButton: false, fields: [] };

    /* sorts */
    if (sorts.length > 0) {
      const selected = [],
        ttl = 'SIRALAMA',
        srt = Object.entries(sorts).map(([key, val]) => {
          if (val['isSelected'])
            selected.push(val['sortType']);
          return { key: val['sortName'], value: val['sortType'] };
        });

      srt.unshift({ key: 'Seçiniz', value: -1 });

      filter['fields'].push({ items: [{ id: 'sorts', modalTitle: ttl, defaultTitle: ttl, multiple: false, type: 'select', showHeader: false, values: srt, value: selected.length > 0 ? selected : -1, ico: 'rightArrow', icoStyle: { width: 40, height: 40 }, css: { defaultTitleStyle: { fontWeight: 'bold', fontSize: 16, color: '#000000' }, fontStyle: { fontSize: 12, color: "#afafaf", }, containerStyle: { marginBottom: 0 }, wrapperStyle: { borderRadius: 0, height: 60, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, paddingLeft: 10, paddingRight: 10, } } }] });
    }

    /* filters */
    Object.entries(filters).forEach(([ind, value]) => {
      const key = value['filterGroupName'] || '';
      if (typeof obj[key] == 'undefined')
        obj[key] = [];
      obj[key].push(value)
    });

    Object.entries(obj).forEach(([key, value]) => {
      const k = { items: [] },
        sel = [],
        values = value.map((val, ind) => {
          if (val['isSelected'])
            sel.push(val['filterId']);

          return { key: val['filterName'], value: val['filterId'] };
        }),
        o = {
          id: key,
          modalTitle: key,
          defaultTitle: key,
          multiple: true,
          type: 'select',
          showHeader: false,
          values: values,
          value: sel.length > 0 ? sel : -1,
          ico: 'rightArrow',
          icoStyle: { width: 40, height: 40 },
          css: {
            defaultTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#000000'
            },
            fontStyle: {
              fontSize: 12,
              color: "#afafaf",
            },
            containerStyle: {
              marginBottom: 0
            },
            wrapperStyle: {
              borderRadius: 0,
              height: 60,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
              paddingLeft: 10,
              paddingRight: 10,
            }
          }
        };


      k['items'].push(o);

      filter['fields'].push(k);
    });

    //console.log(JSON.stringify(filter))

    return filter;
  },
  formatMobilePhoneNumber: function (num) {
    return num.replace(/\)/g, '').replace(/\(/g, '').replace(/\ /g, '').substr(1);
  },
  generateSMSVerificationCode: function (length, options) {
    if (isNaN(length)) {
      throw new TypeError('Length must be a number', 'generate-sms-verification-code/index.js', 3)
    }
    if (length < 1) {
      throw new RangeError('Length must be at least 1', 'generate-sms-verification-code/index.js', 6)
    }
    let possible = '0123456789'
    let string = ''
    for (let i = 0; i < length; i++) {
      string += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    if (options) {
      if (options.type === 'number') {
        return parseFloat(string)
      }
    }

    return string
  },
  getCartCount: function (data) {
    let { products = [] } = data || {}, count = 0;
    if (products != null)
      products.forEach((item) => {
        count = count + (item['quantity'] || 0)
      });
    return count;
  },
  objectMapping: function ({ data = {}, control = '', mapping = {} }) {
    /*
        NOT:
        örneğin kampanyalar sayfası 
 
        mapping: {
            prmLPImg -> api dan donen alan ismi
            image -> app içerisinde olması gereken alan ismi
        }
 
        { prmLPImg: 'image', prmCamID: 'utpCode', prmCamSlug: 'slug', prmDesc: 'desc', prmCat: 'catCode', prmTitle: 'title' }
    */

    const arr = [];
    Object
      .entries(data)
      .forEach(([ind, item]) => {
        const { bannerName = '', parameters = '' } = item,
          obj = { name: bannerName };

        if (parameters != '' && parameters != null)
          Object
            .entries(parameters)
            .forEach(([childInd, child]) => {
              const key = child['parameterKey'] || '',
                value = child['parameterValue'] || '';

              obj['id'] = ind;
              obj[mapping[key] || ''] = value;
            });

        /* 
          prmVisible için ek kontrol, kampanyalarda listede gozuksun gozukmesini çözmek için kullanılır.
        */
        let b = true;
        if (control != '') {
          const { key = '', value = '' } = control;

          Object
            .entries(item['parameters'])
            .forEach(([childInd, child]) => {
              const ky = child['parameterKey'] || '',
                vl = child['parameterValue'] || '';

              if (key == ky && value != vl)
                b = false;
            });
        }

        if (b)
          arr.push(obj);
      });

    return arr;
  },
  mapping: function (o) {
    /*
        loglama için mapping: data içerisinde json desenini yollarsınız. keys içerisindeki key value değeerlerini replace edip keys de belirtilen yapıya çevirir. data ve keys yeni objeye dahil edilmez diğer alanlar dahil edilir. 
 
        {
            event: 'category_visited',
            data: {},
            keys: {
                title: 'category_name',
                catId: 'category_id'
            } 
        }
        
        ex: 
        Utils.mapping({
          event: 'category_visited',
          data: {
            page: 1,
            pageSize: 300,
            catId: 18776,
            title: 'DUDAK KALEMİ'
          },
          keys: {
            title: 'category_name',
            catId: 'category_id'
          }
        });
 
        output: 
        {
          "category_id": "18776",
          "category_name": "DUDAK KALEMİ",
          "event": "category_visited",
        }
    */

    o = o || {};
    var _self = this,
      data = o['data'] || {},
      keys = o['keys'] || '',
      obj = {};

    //console.log(o);

    Object
      .keys(o)
      .map(key => {
        if (key != 'keys' && key != 'data')
          obj[key] = o[key] || '';
      });

    if (keys != '')
      Object
        .keys(data)
        .map(key => {
          const k = _self.trimText((keys[key] || '')),
            value = data[key] || '';
          if (k != '' && value != '')
            obj[k] = value;
        });

    //console.log('send event', obj);

    return obj;
  },

  ajx: function ({ uri = '', method = 'GET', headers = {} }, callback) {
    return fetch(uri, {
      method: method,
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        if (typeof callback !== 'undefined')
          callback({ type: 'success', data: res });
      })
      .catch((error) => {
        if (typeof callback !== 'undefined')
          callback({ type: 'error', data: error });
      });
  },

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
    var _self = this;

    this._fetchURL(
      _self.getURL({ key: "user", subKey: "getToken" }),
      JSON.stringify({
        password: _self.API_KEY,
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

  _log: function (data) {
    /*
    fetch("http://localhost:8888/log/?v=" + JSON.stringify(data), {
      method: "POST"
    })
      .then(function (response) {
        return null;
      })
      .catch(function (error) {
        console.log("error", error);
      });
      */
  },

  /* 
    gelen url göre ilgili yere yönlendirme
  */

  getQueryStringParams: query => {
    if (query.indexOf('?') != -1)
      query = query.substr(query.indexOf('?'), query.length);

    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
          let [key, value] = param.split('=');
          params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
          return params;
        }, {}
        )
      : {}
  },

  getDataByUrl: function ({ uri = '' }) {
    const _self = this,
      _prefix = {
        type: {
          'list': 'product_list',
          'detail': 'product_detail',
          'content': 'content',
          'service': 'service_list'
        }
      },
      uriType = (url) => {
        let type = '';
        if (url.indexOf('urun_liste.aspx') != -1 || url.indexOf('hizliErisim.aspx') != -1)
          type = _prefix.type.list;
        else if (url.indexOf('urun_detay.aspx') != -1)
          type = _prefix.type.detail;
        else if (url.indexOf('icerik.aspx') != -1)
          type = _prefix.type.content;
        else if (url.indexOf('servis_liste.aspx') != -1)
          type = _prefix.type.service;

        return type;
      },
      uriControl = (url) => {
        /* 
          gelen urlde .aspx geçiyorsa getDataByUrl bize bişey döndürmüyor bu yüzden bu tarz urlleri tespit etmek için kullanacağız
        */
        return url.indexOf('.aspx') != -1 ? true : false;
      },
      getQueryObj = (url) => {
        return _self.mapping({
          data: _self.getQueryStringParams(url),
          keys: {
            'kat': 'catId',
            'utp': 'utpId',
            'text': 'searchString',
            'srt': 'sortType',
            'urn': 'productId',
            'ps': 'pageSize',
            'page': 'page',
            'opf': 'filter',
            'lang': 'language',
            'icr': 'contentId',
            'ulk': 'countryId',
            'shr': 'cityId',
            'ilc': 'districtName',
            'dst': 'distance',
            'lat': 'latitude',
            'long': 'longitude'
          }
        });
      },
      send = (url) => {
        const obj = getQueryObj(url),
          type = uriType(url);

        if (type == _prefix.type.list);
        else if (type == _prefix.type.detail);
        else if (type == _prefix.type.content);
        else if (type == _prefix.type.service);

        console.log(type, obj);
      };

    console.log('gelen url', uri);

    if (uriControl(uri))
      send(uri);
    else
      _self.fetch(_self.getURL({ key: 'content', subKey: 'getDataByUrl' }), JSON.stringify({ Url: uri }), (res) => {
        const { data, status } = res;
        if (status == 200) {
          /* 
            önemli not: 
            urlString => burası BE gönderilen url karşılığı olarak dönmeli göndermezlerse 
          */
          const {
            id = '',
            type = null,
            urlString = '/urun_liste.aspx?lang=tr-TR&kat=22104&opf=m742,m7428,m7429'
          } = data || {};

          send(urlString);

          /*
          urlString döndüremezlerse bu yöntem
          if (type != null) {

            if (type == 'icr');
            else if (type == 'kat');
            else if (type == 'urn');
            else if (type == 'rw');

          }
          */
        }
      });
  }
};