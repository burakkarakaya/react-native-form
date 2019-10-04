import React, { Component } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  Dimensions,
  Linking,
  TouchableOpacity,
  WebView,
  View,
  Image,
  Platform
} from "react-native";
import { Asset } from "expo";
import {
  ICONS,
  VIEWERTYPE,
  ITEMTYPE,
  DATA_LOADED,
  SET_FORM,
  SHOW_CUSTOM_POPUP,
  NAVIGATE,
  GET_FAVORITE_PRODUCT
} from "./helper/Constant";
import {
  BoxButton,
  ElevatedView,
} from "./UI";
import {
  AddressListItem,
  BankTransferListItem,
  CartListItem,
  CouponListItem,
  FavoriteListItem,
  FollowListItem,
  OrderListItem,
  ServiceListItem
} from "./components";
import { CountryPicker } from "../form/components";
import { store } from "../store";
import { connect } from "react-redux";
import Placeholder from "rn-placeholder";
import HTML from "react-native-render-html";

const Translation = require("./helper/Translation.js");
const injectScript = `
  (function () {
    window.onclick = function(e) {
      e.preventDefault();
      window.postMessage(e.target.href);
      e.stopPropagation()
    }
  }());
`;

/*
const config = {
    type: 'favorite',
    uri: Utils.getURL({ key: 'user', subKey: 'getFavoriteProductList' }),
    keys: {
        id: 'productId', // required
        arr: 'products', // required
        total: 'totalProductCount' // optional
    },
    data: {
       addressId: 0
    }
};
*/

class ContentPlaceHolder extends Component {
  constructor(props) {
    super(props);
  }

  _getView = () => {
    const _self = this,
      { type } = _self.props;

    return null;
    let view = (
      <View style={{ margin: 10, marginBottom: 20 }}>
        <Placeholder.ImageContent
          size={60}
          animate="fade"
          lineNumber={2}
          lineSpacing={5}
          firstLineWidth="40%"
          lastLineWidth="65%"
        />
      </View>
    );

    return view;
  };

  render() {
    const _self = this;
    return _self._getView();
  }
}

const HTML_DEFAULT_PROPS = {
  tagsStyles: { h1: { color: "red" } },
  classesStyles: { blue: { color: "blue", fontWeight: "800" } },
  imagesMaxWidth: Dimensions.get("window").width,
  onLinkPress: (evt, href) => {
    Linking.openURL(href);
  },
  debug: false
};

const preload = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 25,
          overflow: "hidden",
          ...Platform.select({
            ios: {
              zIndex: 9
            },
            android: {
              elevation: 999
            }
          })
        }}
      >
        <Image
          source={ICONS["loading"]}
          style={{
            resizeMode: "cover",
            width: 60,
            height: 60,
            borderRadius: 30
          }}
        />
      </View>
    </View>
  );
};

class CustomFilterHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.activeIndex || 0
    };
  }

  _onPress = ({ item = {} }) => {
    const _self = this,
      { callback, config } = _self.props,
      { type } = item;

    if (callback) callback(config[type]);

    _self.setState({ active: type });
  };

  _getButton = () => {
    const _self = this,
      { config } = _self.props,
      { active } = _self.state;

    return Object.keys(config).map(key => {
      const k = config[key],
        title = k["title"] || "",
        color = active == key ? "#000000" : "#535353",
        borderColor = active == key ? "#DDDDDD" : "#FFFFFF",
        btn = (
          <BoxButton
            key={key}
            item={{ type: key }}
            textStyle={{ fontFamily: "RegularTyp2", color: color }}
            wrapperStyle={{
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 15,
              marginRight: 12,
              borderColor: borderColor
            }}
            callback={_self._onPress}
          >
            {title}
          </BoxButton>
        );
      return btn;
    });
  };

  render() {
    const _self = this,
      button = _self._getButton();

    return (
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 17,
          paddingTop: 20,
          borderBottomColor: "#dcdcdc",
          borderBottomWidth: 1,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {button}
      </View>
    );
  }
}

class Viewers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      html: "<b></b>",
      data: this._empty(),
      total: 0,
      refreshing: false,
      loading: false,
      loaded: false,
      noResult: false
    };
  }

  /* placeholder için boş data atıyor */
  _empty = () => {
    const _self = this,
      arr = [],
      { type } = _self.props.config,
      total =
        type == ITEMTYPE["CAMPAING"] || type == ITEMTYPE["FEEDS"] ? 2 : 10;
    for (var i = 0; i < total; ++i) arr.push({});
    return arr;
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !Utils.isArrEqual(this.state.data, nextState.data) ||
      this.state.noResult != nextState.noResult ||
      this.state.html !== nextState.html ||
      this.props.flexible != nextProps.flexible
    )
      return true;
    return false;
  }

  onDidFocus = () => {
    const _self = this,
      { navigation, config } = _self.props,
      { type = VIEWERTYPE["LIST"], focusedRefresh = 'false' } = config;

    if (navigation && focusedRefresh == 'false') _self._Listener.remove();



    if (type != VIEWERTYPE["WEBSITEVIEW"])
      _self.setAjx({ uri: _self.getUri(), data: _self._getData() });
  };

  componentDidMount() {
    const _self = this,
      { navigation, onRef } = _self.props;
    _self._isMounted = true;
    if (navigation)
      _self._Listener = navigation.addListener("didFocus", _self.onDidFocus);
    else _self.onDidFocus();

    if (onRef) onRef(this);
  }

  /* https://medium.com/@TaylorBriggs/your-react-component-can-t-promise-to-stay-mounted-e5d6eb10cbb */
  componentWillUnmount() {
    const _self = this,
      { navigation, onRef } = _self.props;
    _self._isMounted = false;
    if (navigation) _self._Listener.remove();

    if (onRef) onRef(null);
  }

  getUri = () => {
    const { uri } = this.props.config;
    return Utils.getURL(uri);
  };

  _getData = () => {
    const { data = {} } = this.props.config;
    return data;
  };

  /* react-native-render-html componenti table tagını çeviremiyor bu yüzden böyle bir kontrol ekledik */
  _clearTag = data => {
    return data
      .replace(/<table/g, "<div")
      .replace(/<\/table/g, "</div")
      .replace(/<tbody/g, "<div")
      .replace(/<\/tbody/g, "</div")
      .replace(/<tr/g, "<div")
      .replace(/<\/tr/g, "</div")
      .replace(/<td/g, "<div")
      .replace(/<\/td/g, "</div");
  };

  _addStyle = () => {
    /*const regular = Asset.fromModule(
      require("root/assets/fonts/proximanova-regular.otf")
    ).uri,
      bold = Asset.fromModule(
        require("root/assets/fonts/BrandonGrotesque-Medium.otf")
      ).uri,
      css =
        '<style type="text/css"> @font-face {font-family: Regular; src: url(' +
        regular +
        ') format("truetype");} @font-face {font-family: Bold; src: url(' +
        bold +
        ') format("truetype");}</style>';
    return css;*/
    return '';
  };

  _addHtmlWrapper = ({ customClass, data }) => {
    const _self = this,
      uri =
        Utils.getURL({ key: "style", subKey: "main" }) +
        "?" +
        parseInt(Math.random() * new Date()),
      style = _self._addStyle(),
      opened =
        '<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
        style +
        "</head><body>",
      closed = "</body></html>",
      css = '<link href="' + uri + '" rel="stylesheet" type="text/css" />',
      htm =
        opened +
        '<div class="ems-mobi-app-container ' +
        customClass +
        '">' +
        (css + Utils.removeStyleTag(data)) +
        "</div>" +
        closed;

    return htm;
  };

  /* özel durumlarda datayı manipule etmek için kullanacağız. Örneğin kampanya sayfası için dönen datayı */
  _customFunc = data => {
    const _self = this,
      { customFunc = "" } = _self.props.config;
    if (customFunc == "campaing") {
      data = Utils.objectMapping({
        data: data,
        control: { key: "prmVisible", value: "yes|Evet" },
        mapping: {
          prmLPImg: "image",
          prmCamID: "utpCode",
          prmCamSlug: "slug",
          prmDesc: "desc",
          prmCat: "catCode",
          prmTitle: "title",
          prmExternal: "external",
          prmPlatform: "platform"
        }
      });
    } else if (customFunc == "opportunity") {
      data = Utils.objectMapping({
        data: data,
        mapping: {
          prmUniqueKod: "id",
          prmTitle: "title",
          prmDesc: "desc",
          prmPlatform: "platform"
        }
      });
    } else if (customFunc == "customDetailContent") {
      data = [
        {
          content: Utils.objectMapping({
            data: data,
            mapping: {
              prmTitle: "title",
              prmContent: "content",
              prmImg: "img",
              prmVideoID: "video",
              prmLayout: "layout",
              prmType: "type"
            }
          })
        }
      ];
    }
    return data;
  };

  /* */
  _setRdx = (data) => {
    const _self = this,
      { config = {} } = _self.props,
      { itemType = "" } = config;


    switch (itemType) {
      case ITEMTYPE["FAVORITE"]: {
        let obj = {};

        data.map((item, ind) => {
          const key = item['productId'] || '';
          obj[key] = 1;
        });

        store.dispatch({
          type: GET_FAVORITE_PRODUCT,
          value: obj
        });

        return false;
      }
      default:
        return false;
    }
  }

  /* */
  setAjx = ({ uri, data = {} }, callback) => {
    const _self = this,
      { type = VIEWERTYPE["LIST"] } = _self.props.config;

    Utils.fetch(uri, JSON.stringify(data), (res) => {
      console.log(res)
      if (_self._isMounted) {

        const { keys, customClass = "", customFunc = "" } = _self.props.config,
          keyArr = keys["arr"] || "",
          keyTotal = keys["total"] || "",
          k = res.data || {};

        let data = k[keyArr] || [];

        if (customFunc != "") data = _self._customFunc(data);

        if (type == VIEWERTYPE["HTMLTOJSON"] && data.length > 0) {
          data = data.replace(/(\r\n|\n|\r)/gm, " "); // htmlden gelen fazla boşlukları siliyoruz. Yoksa JSON.parse hata veriyor
          data = JSON.parse(data)[keys["obj"]][keys["objArr"]] || [];
        }

        if (data.length == 0) {
          _self.setState({ data: [], total: 0, loaded: true, noResult: true });

          if (_self.props.noResult) _self.props.noResult();
        } else if (
          type == VIEWERTYPE["LIST"] ||
          type == VIEWERTYPE["HTMLTOJSON"] ||
          type == VIEWERTYPE["SCROLLVIEW"]
        )
          _self.setState({
            data: data,
            total: res.data[keyTotal] || data.length || 0,
            loaded: true,
            noResult: false
          });
        else if (type == VIEWERTYPE["WEBVIEW"])
          _self.setState({
            html: _self._addHtmlWrapper({ customClass: customClass, data: data }),
            loaded: true,
            noResult: false
          });
        else
          _self.setState({
            html: _self._clearTag(data),
            loaded: true,
            noResult: false
          });

        _self._callback({ type: DATA_LOADED, data: data });

        /* sepet için gerekti */
        if (_self.props.response)
          _self.props.response({ type: DATA_LOADED, data: res.data });

        /* callback */
        if (typeof callback !== "undefined") callback();

        /* */
        _self._setRdx(data);

      }

    });
  };

  _keyExtractor = (item, index) => {
    const _self = this,
      { keys } = _self.props.config;

    return (
      keys["arr"] +
      "-" +
      (item[keys["id"]] || "0") +
      "-" +
      index
    ).toString();
  };

  _onGotoDetail = o => {
    this.props.navigation.navigate("Detail", o);
  };

  /* item element remove */
  _removeItem = ({ key = "", value = "" }) => {
    /*
        const _self = this,
            { data } = _self.state,
            arr = data.filter(function (item, index) {
                return item[key] != value;
            });
        _self.setState({ data: arr });
        */
    const _self = this;
    _self._onUpdateItem();
  };

  _preload = async b => {
    //store.dispatch({ type: SHOW_PRELOADING, value: b });
  };

  /* tüm listeyi güncelle */
  _onUpdateItem = () => {
    const _self = this;
    _self.setState({ ..._self.state, loaded: false, data: [] });
    setTimeout(() => {
      _self.onDidFocus();
    }, 10);
  };

  /* Viewer genel callback */
  _callback = obj => {
    const _self = this,
      { showPopup = false } = obj,
      { callback, refreshing = false } = _self.props;

    if (refreshing) obj["refreshing"] = _self._refreshing;

    if (showPopup)
      store.dispatch({
        type: SHOW_CUSTOM_POPUP,
        value: { visibility: true, ...obj }
      });
    else if (callback) callback(obj);
  };

  /* refreshing */
  _refreshing = () => {
    const _self = this;
    _self.onDidFocus();
  };

  /* update redux */
  updateRedux = obj => {
    const _self = this;
    _self.props.dispatch(obj);
  };

  _renderItem = ({ item, key, index }) => {
    const _self = this,
      { config = {} } = _self.props,
      { itemType = "", viewType = "" } = config,
      { loaded, total } = _self.state;

    if (!loaded) return <ContentPlaceHolder key={key} type={itemType} />;

    switch (itemType) {
      case ITEMTYPE["BANKTRANSFER"]:
        return (
          <BankTransferListItem
            key={key}
            index={index}
            callback={_self._callback}
            data={item}
          />
        );
      case ITEMTYPE["CARTLIST"]:
        return (
          <CartListItem
            viewType={viewType}
            totalCount={total}
            index={index}
            key={key}
            callback={_self._callback}
            onUpdateItem={_self._onUpdateItem}
            onRemove={_self._removeItem}
            data={item}
          />
        );
      case ITEMTYPE["ADDRESS"]:
        return (
          <AddressListItem
            config={_self.props.config}
            callback={_self._callback}
            onRemove={_self._removeItem}
            data={item}
          />
        );
      case ITEMTYPE["FAVORITE"]:
        return <FavoriteListItem onRemove={_self._removeItem} data={item} />;
      case ITEMTYPE["ORDER"]:
        return <OrderListItem refreshing={this._refreshing} callback={this._callback} data={item} />;
      case ITEMTYPE["COUPON"]:
        return <CouponListItem data={item} />;
      case ITEMTYPE["FOLLOWLIST"]:
        return (
          <FollowListItem
            onRemove={_self._removeItem}
            data={item}
            config={config}
          />
        );
      case ITEMTYPE["SERVICELIST"]:
        return <ServiceListItem callback={_self._callback} data={item} />;
      default:
        return null;
    }
  };

  _getItem = () => {
    const _self = this,
      { data = [] } = _self.state,
      arr = [];

    if (data.length > 0)
      data.map((item, ind) => {
        arr.push(
          _self._renderItem({
            item: item,
            key: _self._keyExtractor(item, ind),
            index: ind
          })
        );
      });

    return arr;
  };

  _getHeader = () => {
    const _self = this,
      { itemType } = _self.props.config;

    return null;
  };

  _filtered = obj => {
    const _self = this,
      { itemType } = _self.props.config;
    if (itemType == ITEMTYPE["SERVICELIST"]) {
      const { multiValue = [] } = obj,
        data = {},
        keys = ["countryId", "cityId", "districtName"];

      Object.entries(multiValue).forEach(([ind, item]) => {
        const { key, value } = item;
        if (
          value != -1 &&
          (value != "" &&
            value != Translation["dropdown"]["choose"] &&
            value != Translation["dropdown"]["countryChoose"] &&
            value != Translation["dropdown"]["cityChoose"] &&
            value != Translation["dropdown"]["districtChoose"]) &&
          keys.includes(key)
        )
          data[key] = value;
      });

      _self._preload(true);
      _self.setAjx({ uri: _self.getUri(), data: data }, () => {
        _self._preload(false);
      });
    } else if (itemType == ITEMTYPE["COUPON"]) {
      _self._preload(true);
      _self.setAjx({ uri: _self.getUri(), data: obj["data"] || {} }, () => {
        _self._preload(false);
      });
    } else if (itemType == ITEMTYPE["FOLLOWLIST"]) {
      _self.props.config["deleteURI"] = obj["deleteURI"] || {};
      _self.props.config["uri"] =
        obj["url"] ||
        {}; /* filtrelemede url değiştiği için burada son tıklanan butonun url genel config eşitlenir böylece sayfa refresh olduğu zaman son url istek atar */

      _self._preload(true);
      _self.setAjx({ uri: obj["uri"] || "", data: obj["data"] || {} }, () => {
        _self._preload(false);
      });
    } else if (itemType == ITEMTYPE["ADDRESS"]) {
      const data = {
        type: SET_FORM,
        itemType: "createAddress",
        refreshing: _self._onUpdateItem,
        modalTitle: "YENİ ADRES EKLE"
      };
      store.dispatch({
        type: SHOW_CUSTOM_POPUP,
        value: { visibility: true, ...data }
      });
    }
  };

  _getFilter = () => {
    const _self = this,
      { itemType, filterData = {} } = _self.props.config,
      { noResult = false } = _self.state,
      { filtered = false } = filterData;

    switch (itemType) {
      case ITEMTYPE["ADDRESS"]: {
        if (!filtered || noResult) return null;
        return (
          <View
            style={{
              alignItems: "flex-end",
              paddingTop: 15,
              marginLeft: 15,
              marginRight: 15
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={_self._filtered}
            >
              <Text style={{ fontFamily: "Bold", fontSize: 14 }}>
                YENİ ADRES EKLE
              </Text>
              <Image
                source={ICONS["plus"]}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </View>
        );
      }
      case ITEMTYPE["SERVICELIST"]: {
        if (!filtered || noResult) return null;
        return (
          <ElevatedView
            elevation={0}
            style={{
              backgroundColor: "#FFFFFF",
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 12,
              paddingTop: 0
            }}
          >
            <CountryPicker
              selectionValue={true}
              callback={_self._filtered}
              theme={"LIGHT"}
              control={false}
              key={"country"}
              data={filterData}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
              countryContainerStyle={{
                width: "50%",
                paddingRight: 5,
                marginBottom: 0
              }}
              countryHeaderShow={false}
              cityContainerStyle={{
                width: "50%",
                paddingLeft: 5,
                marginBottom: 0
              }}
              cityHeaderShow={false}
              districtContainerStyle={{
                width: 0,
                height: 0,
                marginBottom: 0,
                opacity: 0
              }}
              districtHeaderShow={false}
              countryChoose={Translation["dropdown"]["countryChoose"]}
              cityChoose={Translation["dropdown"]["cityChoose"]}
              districtChoose={Translation["dropdown"]["districtChoose"]}
            />
          </ElevatedView>
        );
      }
      case ITEMTYPE["COUPON"]: {
        const _config = [
          {
            title: "Açık Kuponlar",
            itemType: "coupon",
            uri: Utils.getURL({ key: "integrator", subKey: "getCouponDetail" }),
            keys: {
              id: "couponKey",
              arr: "couponDetailList"
            },
            data: {
              status: 4,
              type: 2,
              active: true
            }
          },
          {
            title: "Kapanan",
            itemType: "coupon",
            uri: Utils.getURL({ key: "integrator", subKey: "getCouponDetail" }),
            keys: {
              id: "couponKey",
              arr: "couponDetailList"
            },
            data: {
              status: 4,
              type: 2,
              active: false
            }
          }
        ];

        return (
          <CustomFilterHeader config={_config} callback={_self._filtered} />
        );
      }
      case ITEMTYPE["FOLLOWLIST"]: {
        const _config = [
          {
            title: "Fiyatı Düşenler",
            itemType: "followList",
            deleteURI: { key: "user", subKey: "deletePriceFollowUpProduct" },
            url: { key: "user", subKey: "getPriceFollowUpList" },
            uri: Utils.getURL({ key: "user", subKey: "getPriceFollowUpList" }),
            keys: {
              id: "productId",
              arr: "products"
            },
            data: {}
          },
          {
            title: "Stoğa Girenler",
            itemType: "followList",
            deleteURI: { key: "user", subKey: "deleteStockFollowUpProduct" },
            url: { key: "user", subKey: "getStockFollowUpList" },
            uri: Utils.getURL({ key: "user", subKey: "getStockFollowUpList" }),
            keys: {
              id: "productId",
              arr: "products"
            },
            data: {}
          }
        ];

        return (
          <CustomFilterHeader config={_config} callback={_self._filtered} />
        );
      }
      default:
        return null;
    }
  };

  _onRefresh = () => {
    const _self = this,
      { refreshing = true } = _self.props.config;
    if (refreshing)
      _self.setState({ refreshing: true }, () => {
        _self.setAjx({ uri: _self.getUri(), data: _self._getData() });
      });
  };

  _viewable = [];

  _onViewableItemChanged = ({ index, item }) => {
    const _self = this,
      { onViewableItemsChanged } = _self.props,
      { loaded = false } = _self.state,
      { type = VIEWERTYPE["LIST"] } = _self.props.config;

    if (!_self._viewable.includes(index) && loaded) {
      _self._viewable.push(index);

      if (onViewableItemsChanged) onViewableItemsChanged(item);
    }
  };

  _onViewableItemsChanged = ({ viewableItems }) => {
    /* viewport giren itemları döndürür */
    const _self = this;
    viewableItems.map(item => {
      _self._onViewableItemChanged(item);
    });
  };

  _getNoResultView = ({
    wrapperStyle = {},
    ico = "",
    text = "",
    button = null
  }) => {
    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          },
          wrapperStyle
        ]}
      >
        <View
          style={{ width: 275, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{
              width: 158,
              height: 158,
              resizeMode: "contain",
              marginBottom: 20
            }}
            source={ICONS[ico]}
          />
          <Text
            style={{
              fontFamily: "RegularTyp2",
              fontSize: 22,
              marginBottom: 34
            }}
          >
            {text}
          </Text>
          {button}
        </View>
      </View>
    );
  };

  /* anasayfaya dön */
  _onGotoHome = () => {
    this.props.dispatch({
      type: NAVIGATE,
      value: { item: { navigation: "Home" } }
    });

    const { rootNavigation = {} } = store.getState() || {},
      { mainNav } = rootNavigation;

    mainNav.navigate("Feeds", {});
  };

  _onNewAddress = () => {
    const _self = this;
    _self._filtered();
    //_self._callback({ type: NEW_ADDRESS_CLICKED });
  };

  _noResultView = () => {
    const _self = this,
      { itemType = "" } = _self.props.config;

    let view = _self._getNoResultView({
      ico: "contentNoResult",
      text: "İçerik Bulunamadı!"
    });

    if (itemType == ITEMTYPE["CARTLIST"])
      view = _self._getNoResultView({
        ico: "cartNoResult",
        text: "Sepetiniz Henüz Boş",
        button: (
          <BoxButton wrapperStyle={{ height: 48 }} callback={_self._onGotoHome}>
            ANASAYFAYA GİT
          </BoxButton>
        )
      });
    else if (itemType == ITEMTYPE["ADDRESS"])
      view = _self._getNoResultView({
        ico: "addressNoResult",
        text: "Adres Bilgileriniz Henüz Boş",
        button: (
          <BoxButton
            wrapperStyle={{ height: 48, backgroundColor: "#000000" }}
            textStyle={{ color: "#FFFFFF" }}
            callback={_self._onNewAddress}
          >
            Yeni Adres Ekle
          </BoxButton>
        )
      });
    else if (itemType == ITEMTYPE["COUPON"])
      view = _self._getNoResultView({
        ico: "couponNoResult",
        text: "Kuponlarınız Boş"
      });
    else if (itemType == ITEMTYPE["FAVORITE"])
      view = _self._getNoResultView({
        ico: "favoriteNoResult",
        text: "Favorileriniz Boş"
      });
    else if (itemType == ITEMTYPE["FOLLOWLIST"])
      view = _self._getNoResultView({
        ico: "followListNoResult",
        text: "Takip Listeniz Boş"
      });
    else if (itemType == ITEMTYPE["ORDER"])
      view = _self._getNoResultView({
        ico: "cartNoResult",
        text: "Siparişleriniz Boş"
      });
    else if (itemType == ITEMTYPE["OPPORTUNITY"]) view = null;

    return view;
  };

  /*
        webview içerisine tıklananınca callback döndürmek
    */
  onMessage = ({ nativeEvent }) => {
    const data = nativeEvent.data;

    if (data !== undefined && data !== null) Linking.openURL(data);
  };

  _getViewer = () => {
    const _self = this,
      { scrollEnabled = true, flexible = true } = _self.props,
      flex = flexible ? { flex: 1 } : {},
      {
        type = VIEWERTYPE["LIST"],
        horizontal = false,
        showsHorizontalScrollIndicator = true,
        siteURI = ''
      } = _self.props.config,
      { noResult = false, loaded = false } = _self.state;

    let view = null;
    if (noResult) view = _self._noResultView();
    else if (
      type == VIEWERTYPE["LIST"] ||
      type == VIEWERTYPE["HTMLTOJSON"]
    )
      view = (
        <FlatList
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          horizontal={horizontal}
          scrollEnabled={scrollEnabled}
          data={_self.state.data}
          keyExtractor={_self._keyExtractor}
          renderItem={_self._renderItem}
          ListHeaderComponent={_self._getHeader}
          refreshing={_self.state.refreshing}
          //onRefresh={_self._onRefresh}
          onViewableItemsChanged={_self._onViewableItemsChanged}
        />
      );
    else if (
      type == VIEWERTYPE["HTML"] ||
      type == VIEWERTYPE["WEBVIEW"] ||
      type == VIEWERTYPE["SCROLLVIEW"]
    ) {
      if (!loaded) view = preload();
      else if (type == VIEWERTYPE["HTML"])
        view = (
          <ScrollView style={{ ...flex }}>
            <HTML {...HTML_DEFAULT_PROPS} html={_self.state.html} />
          </ScrollView>
        );
      else if (type == VIEWERTYPE["WEBVIEW"])
        view = (
          <View style={{ ...flex }}>
            <WebView
              scalesPageToFit={false}
              automaticallyAdjustContentInsets={false}
              source={{ html: _self.state.html }}
              injectedJavaScript={injectScript}
              onMessage={_self.onMessage}
            />
          </View>
        );
      else if (type == VIEWERTYPE["SCROLLVIEW"])
        view = (
          <ScrollView scrollEnabled={scrollEnabled} style={{ ...flex }}>
            {_self._getItem()}
          </ScrollView>
        );
    } else if (type == VIEWERTYPE["WEBSITEVIEW"])
      view = (
        <WebView
          scalesPageToFit={false}
          automaticallyAdjustContentInsets={false}
          source={{ uri: Utils.getWebsiteURL(siteURI) }}
        />
      );

    return view;
  };

  render() {
    const _self = this,
      { flexible = true } = _self.props,
      flex = flexible ? { flex: 1 } : {};

    return (
      <View style={[{ ...flex }, { ..._self.props.wrapperStyle }]}>
        {_self._getFilter()}
        <View style={[{ ...flex, padding: 0 }, { ..._self.props.style }]}>
          {_self._getViewer()}
        </View>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return state;
}
const Viewer = connect(mapStateToProps)(Viewers);
export { Viewer };