import {
  Alert,
} from 'react-native';
const Translation = require('./Translation.js');
module.exports = {
  mapApiKey: 'AIzaSyDktunNtvwuVvGEA6LSVfQoiRsptLStTgc',
  bazaarVoiceApiKey: 'ca0fITp8PBeW9pf7e9vzn0BABaSeJVjOBqp6EWZVZCXsA',
  prefix: 'https://www.flormar.com.tr',
  imagePrefix: 'flormar.com.tr',
  URLs: {
    style: {
      main: '/upload/APP/styles/mobiApp.css'
    },
    banner: {
      getBannerList: '/webapi/v3/Banner/getBannerList'
    },
    product: {
      getCategoryList: '/webapi/v3/Product/getCategoryList',
      getSearchSuggestionList: '/webapi/v3/Product/getSearchSuggestionList',
      getProductList: '/webapi/v3/Product/getProductList',
      getProductDetail: '/webapi/v3/Product/getProductDetail',
      getProductVideos: '/mobile-app-product-video-export.html',
      getProductIdByBarcode: '/webapi/v3/Product/getProductIdByBarcode'
    },
    user: {
      addFavoriteProduct: '/webapi/v3/User/addFavoriteProduct',
      deleteFavoriteProduct: '/webapi/v3/User/deleteFavoriteProduct',
      getToken: '/webapi/v3/User/getToken',
      getUser: '/webapi/v3/User/getUser',
      setUser: '/webapi/v3/User/setUser',
      createUser: '/webapi/v3/User/createUser',
      login: '/webapi/v3/User/login',
      logout: '/webapi/v3/User/logout',
      recoverPassword: '/webapi/v3/User/recoverPassword',
      changePassword: '/webapi/v3/User/changePassword',
      getFavoriteProductList: '/webapi/v3/User/getFavoriteProductList',
      deleteFavoriteProduct: '/webapi/v3/User/deleteFavoriteProduct',
      getAgreement: '/webapi/v3/User/getAgreement',
      getStockFollowUpList: '/webapi/v3/User/getStockFollowUpList', // takip listem - Stoğa Girenler
      getPriceFollowUpList: '/webapi/v3/User/getPriceFollowUpList', // takip listem - fiyatı düşenler
      checkGuestMail: '/webapi/v3/User/checkGuestMail',
      CheckUserPhoneNumber: '/webapi/v3/User/CheckUserPhoneNumber',
      deleteStockFollowUpProduct: '/webapi/v3/User/deleteStockFollowUpProduct',
      deletePriceFollowUpProduct: '/webapi/v3/User/deletePriceFollowUpProduct',
      addStockFollowUpProduct: '/webapi/v3/User/addStockFollowUpProduct',
      addPriceFollowUpProduct: '/webapi/v3/User/addPriceFollowUpProduct'
    },
    address: {
      country: '/webapi/v3/Address/getCountry',
      city: '/webapi/v3/Address/getCity',
      district: '/webapi/v3/Address/getDistrict',
      createAddress: '/webapi/v3/Address/createAddress',
      getAddress: '/webapi/v3/Address/getAddress',
      setAddress: '/webapi/v3/Address/setAddress',
      deleteAddress: '/webapi/v3/Address/deleteAddress',
    },
    order: {
      getOrder: '/webapi/v3/Order/getOrder', // siparişlerim
      getOrderDetail: '/webapi/v3/Order/getOrderDetail', // sipariş detay
      repeatOrder: '/webapi/v3/Order/repeatOrder', // sipariş tekrarla
      getCancelationReasonList: '/webapi/v3/Order/getCancelationReasonList',
      cancelOrder: '/webapi/v3/Order/cancelOrder'
    },
    integrator: {
      /*
          Implementation Notes
          StatusId : 1(New), 2(Approved), 3(Cancel), 4(Used) - Type : 1(Gift Cart), 2(Discount Coupon)
      */
      getCouponDetail: '/webapi/v3/Integrator/getCouponDetail' // kuponlarım
    },
    service: {
      getServiceList: '/webapi/v3/Service/getServiceList', // servis listesi
      getServiceTypeList: '/webapi/v3/Service/getServiceTypeList',
    },
    export: {
      getExport: '/webapi/v3/Export/getExport',
    },
    content: {
      getContent: '/webapi/v3/Content/getContent',
      getDataByUrl: '/webapi/v3/Content/getDataByUrl',
    },
    cart: {
      checkCreditCard: '/webapi/v3/Cart/checkCreditCard',
      validateCart: '/webapi/v3/Cart/validateCart',
      getCart: '/webapi/v3/Cart/getCart',
      setCart: '/webapi/v3/Cart/setCart',
      addCartLine: '/webapi/v3/Cart/addCartLine',
      updateCartLine: '/webapi/v3/Cart/updateCartLine',
      deleteCartLine: '/webapi/v3/Cart/deleteCartLine',
      useCoupon: '/webapi/v3/Cart/useCoupon',
      deleteCoupon: '/webapi/v3/Cart/deleteCoupon',
      getCargo: '/webapi/v3/Cart/getCargo',
      getPayment: '/webapi/v3/Cart/getPayment',
      getAgreement: '/webapi/v3/Cart/getAgreement',
      getInstallment: '/webapi/v3/Cart/getInstallment',
      getBankTransfer: '/webapi/v3/Cart/getBankTransfer',
      getPos3DParameter: '/webapi/v3/Cart/getPos3DParameter',
      checkBankPoint: '/webapi/v3/Cart/checkBankPoint',
      setCartOrder: '/webapi/v3/Cart/setCartOrder'
    },
    bazaarvoice: {
      userCode: '/mobiapp-bazaarvoice.txt?uyekod='
    },
    cegid: {
      checkPhoneNumber: '/exp-cegid-user/?phone=',
    },
    staticPageURI: {
      extraTL: '/extra-iframe/?mobiapp=true'
    }
  },
  customURLs: {
    location: 'https://maps.googleapis.com/maps/api/distancematrix/json?language={{lang}}&units=metric&origins={{origins}}&destinations={{destinations}}&key={{mapApiKey}}',
    reviewsList:
      'https://stg.api.bazaarvoice.com/data/reviews.json?apiversion=5.4' +
      '&passkey={{bazaarApiKey}}' +
      '&Filter=ProductId:{{id}}' +
      '&Sort=Rating:desc' +
      '&Limit={{limit}}',
    submitReview: 'https://stg.api.bazaarvoice.com/', // to be added
  },
  getCustomURL: function ({ key = '', lang = 'tr-TR', origins = '', destinations = '', limit = '', id = '' }) {
    const _t = this;

    return (_t.customURLs[key] || '')
      .replace(/{{lang}}/g, lang)
      .replace(/{{origins}}/g, origins)
      .replace(/{{destinations}}/g, destinations)
      .replace(/{{mapApiKey}}/g, _t.mapApiKey)
      .replace(/{{bazaarApiKey}}/g, _t.bazaarVoiceApiKey)
      .replace(/{{id}}/g, id)
      .replace(/{{limit}}/g, limit);
  },
  getURL: function ({ key = '', subKey = '' }) {
    const _t = this;
    return _t.prefix + (_t.URLs[key][subKey] || '');
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

    if (k.toString().indexOf('.') != -1 )
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
  confirm: function ({ title = 'Uyarı', message = '' }, callback) {
    const { cancel, ok } = Translation['confirm'];
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
    const { ok } = Translation['confirm'];
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
        o = { id: key, modalTitle: key, defaultTitle: key, multiple: true, type: 'select', showHeader: false, values: values, value: sel.length > 0 ? sel : -1, ico: 'rightArrow', icoStyle: { width: 40, height: 40 }, css: { defaultTitleStyle: { fontWeight: 'bold', fontSize: 16, color: '#000000' }, fontStyle: { fontSize: 12, color: "#afafaf", }, containerStyle: { marginBottom: 0 }, wrapperStyle: { borderRadius: 0, height: 60, borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0, paddingLeft: 10, paddingRight: 10, } } };


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
  productTypes: function(o){
    /* 
      renk, çeşit ayrımı için kullanırız. çeşit için ürün tipi idsi 200
    */
    o = o || {};
    let arr = o['productTypes'] || [],
    k = 'Renk';
    if( arr.length > 0 )
      arr.map((item)=>{
          const n = item['productTypeId'] || 0;
          if( n == 200 ){
            k = 'Çeşit';
            return false;
          }
      })
    return k;
  }
};