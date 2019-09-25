/* 
  form için gerekli iconlar burdan tanımlanır 
*/
export const ICONS = {
  storeLocation: require("../assets/storeLocation.png"),
  myLocation: require("../assets/myLocation.png"),
  searchMap: require("../assets/search-map.png"),
  map: require("../assets/map.png"),
  list: require("../assets/list.png")
};

/* 
  VIEWER SAYFA TİPLERİ 
*/
export const VIEWERTYPE = {
  SEG: "segmentify",
  SCROLLVIEW: "scrollView",
  LIST: "listViewer",
  HTML: "htmlViewer",
  HTMLTOJSON: "htmlToJSON",
  WEBVIEW: "webViewer",
  FORM: "form"
};

/* VIEWER FLATLIST ITEM TYPE */
export const ITEMTYPE = {
  BANKTRANSFER: "bank_transfer",
  ADDRESS: "address",
  FAVORITE: "favorite",
  ORDER: "order",
  COUPON: "coupon",
  FOLLOWLIST: "followList",
  SERVICELIST: "serviceList",
  CARTLIST: "cartList",
  CAMPAING: "campaing",
  VIDEO: "video",
  FEEDS: "feeds",
  TRIGGERBUTTON: "triggerButton",
  EXITBUTTON: "exitButton",
  OPPORTUNITY: "opportunity", // SEPET SAYFASI FIRSATLAR
  CUSTOMDETAIL: "customDetail", // feeds blog, collection tıklananınca açılacak detay
  CUSTOMDETAILCONTENT: "customDetailContent", // detal sayfası nasıl uygulanır kısmı
  EXTRABUTTON: "extraButton"
};

export const CLICK = "CLICK";
export const DOUBLE_CLICK = "DOUBLE_CLICK";
export const DATA_LOADED = "DATA_LOADED";
export const SERVICE_LIST_CLICKED = "SERVICE_LIST_CLICKED";
export const ORDER_LIST_CLICKED = "ORDER_LIST_CLICKED";
export const ADDRESS_LIST_CLICKED = "ADDRESS_LIST_CLICKED";
export const NEW_ADDRESS_CLICKED = "NEW_ADDRESS_CLICKED";
export const SET_FORM = "SET_FORM";
export const SET_VIEWER = "SET_VIEWER";
export const SET_INSTAGRAM = "SET_INSTAGRAM";
export const SET_WEBVIEW = "SET_WEBVIEW";
export const SET_ADDRESS_ITEM_CLICK = "SET_ADDRESS_ITEM_CLICK";
export const SET_VIDEO_PLAYER = "SET_VIDEO_PLAYER";
export const UPDATE_CART = "UPDATE_CART";
export const REMOVE_CART = "REMOVE_CART";
export const CART_FOOTER_MARGIN_BOTTOM = 115;
export const CART_FOOTER_EXPAND_MARGIN_BOTTOM = 200;
export const CART_BACKGROUND_COLOR_1 = "rgb(244, 236, 236)";
export const CART_BACKGROUND_COLOR_2 = "#FFFFFF";



/*** Redux Actions ***/

/* settings */
export const SET_SETTINGS = "SET_SETTINGS";
export const SET_CLIENT_PROPERTIES = "SET_CLIENT_PROPERTIES";

/* root navigation */
export const SET_OPTIN_NAVIGATION = "SET_OPTIN_NAVIGATION";
export const SET_MAIN_NAVIGATION = "SET_MAIN_NAVIGATION";
export const SET_NAVIGATION = "SET_NAVIGATION";
export const NAVIGATE = "NAVIGATE";

/* cart */
export const BANK_TRANSFER = "bankTransfer";
export const CREDIT_CART = "creditCart";
export const SET_CART_ADDRESS = "SET_CART_ADDRESS";
export const SET_DIFFERENT_ADDRESS = "SET_DIFFERENT_ADDRESS";
export const CARGO_CLICKED = "CARGO_CLICKED";
export const SET_INSTALLMENT = "SET_INSTALLMENT";
export const SET_CART_INFO = "SET_CART_INFO";
export const SET_CART_CARGO = "SET_CART_CARGO";
export const SET_CART_ITEMS = "SET_CART_ITEMS";
export const SET_PAYMENT = "SET_PAYMENT";
export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const SET_CART_NO_RESULT = "SET_CART_NO_RESULT";
export const RESET_CART = "RESET_CART";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const SET_CART_PROGRESS = "SET_CART_PROGRESS";
export const SET_BANK_TRANSFER = "SET_BANK_TRANSFER";
export const RESET_PAYMENT = "RESET_PAYMENT";
export const SET_CREDIT_CART = "SET_CREDIT_CART";
export const SET_BANK_POINT = "SET_BANK_POINT";
export const SET_EXTRA_POINT = "SET_EXTRA_POINT";
export const SET_USER_POINTS = "SET_USER_POINTS";
export const SET_AGREEMENT = "SET_AGREEMENT";
export const SET_ORDER_SUCCESS_MESSAGE = "SET_ORDER_SUCCESS_MESSAGE";
export const SET_ORDER_3D_BUTTON = "SET_ORDER_3D_BUTTON";

/* general */
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const SET_TEXTURE_DISPLAY = "SET_TEXTURE_DISPLAY";
export const SET_SCREEN_DIMENSIONS = "SET_SCREEN_DIMENSIONS";
export const OPEN_PRODUCT_DETAILS = "OPEN_PRODUCT_DETAILS";
export const CLOSE_PRODUCT_DETAILS = "CLOSE_PRODUCT_DETAILS";
export const UPDATE_PRODUCT_DETAILS_ITEM = "UPDATE_PRODUCT_DETAILS_ITEM";
export const UPDATE_PRODUCT_VIDEOS = "UPDATE_PRODUCT_VIDEOS";
export const SHOW_PRELOADING = "SHOW_PRELOADING";
export const OPEN_VIDEO_PLAYER = "OPEN_VIDEO_PLAYER";

/* user */
export const SET_USER = "SET_USER";
export const SET_USER_CHANGE = "SET_USER_CHANGE";
export const UPDATE_USER = "UPDATE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SET_CART_NUM = "SET_CART_NUM";
export const UPDATE_OPTIN = "UPDATE_OPTIN";
export const SET_FAVORITE_PRODUCT = "SET_FAVORITE_PRODUCT";
export const GET_FAVORITE_PRODUCT = "GET_FAVORITE_PRODUCT";
export const SET_STOCK_FOLLOWUP_PRODUCT = "SET_STOCK_FOLLOWUP_PRODUCT";
export const SET_PRICE_FOLLOWUP_PRODUCT = "SET_PRICE_FOLLOWUP_PRODUCT";
export const REFRESH_CART = "REFRESH_CART";

/* menu */
export const SET_MENU_TYPE = "SET_MENU_TYPE";
export const SHOW_MENU = "SHOW_MENU";
export const HIDE_MENU = "HIDE_MENU";

/* location */
export const SET_LOCATION = "SET_LOCATION";

/* offline notice */
export const SET_CONNECTION = "SET_CONNECTION";

/* segmentify */
export const SET_SEGMENTIFY_USER_SESSION = "SET_SEGMENTIFY_USER_SESSION";
export const SET_SEGMENTIFY_INSTANCEID = "SET_SEGMENTIFY_INSTANCEID";

/* assistant */
export const ASSISTANT_SHOW = "ASSISTANT_SHOW";
export const SET_ASSISTANT = "SET_ASSISTANT";
export const ASSISTANT_OPENED = "ASSISTANT_OPENED";

/* customPopup */
export const SHOW_CUSTOM_POPUP = "SHOW_CUSTOM_POPUP";